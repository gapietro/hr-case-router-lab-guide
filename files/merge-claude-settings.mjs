#!/usr/bin/env node
// Put the lab's Claude Code settings into ~/.claude/settings.json.
//
//   node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs          set up or merge
//   node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs --check  only check, change nothing
//   node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs --restore  after the lab: put yours back
//
// No settings file yet: it writes the lab's file, and remembers you had none.
// A settings file already: it saves a backup next to it (only the first time,
// so running it again never overwrites your original), then adds the lab's
// settings and keeps everything that was there. Lists (like "deny" and "ask")
// are added to, never replaced. A setting that switches auto mode off, and your
// own auto mode rules ("autoMode"), are taken out for the lab (the backup keeps
// them). If your file isn't valid JSON, it stops and changes nothing.
//
// --restore puts back your backup exactly, or, if you had no file before the
// lab, takes the lab's settings out and keeps the rest. Once it has run, a
// second run changes nothing.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const lab = JSON.parse(readFileSync(join(here, 'claude-settings.json'), 'utf8'));
const target = join(homedir(), '.claude', 'settings.json');
const checkOnly = process.argv.includes('--check');
const restore = process.argv.includes('--restore');
const backup = `${target}.before-lab.bak`;
const labCopy = `${target}.lab.bak`;
// Marks "there was no settings file before the lab".
const noneBefore = `${target}.before-lab.none`;
// Marks "--restore has already put your settings back".
const restored = `${target}.before-lab.restored`;
// Marks "the lab is set up, and the backup (or the no-file marker) is the record
// of what was there before it". Only --restore removes it.
const active = `${target}.before-lab.active`;
// Settings only this lab adds: either one in a file means the lab's settings are there.
const LAB_ONLY = ['Read(~/projects/hr-case-router-lab-guide/**)', 'Read(~/projects/hr-case-router-notes/**)'];

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const read = (f) => JSON.parse(readFileSync(f, 'utf8'));
const write = (f, j) => writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
const hasLabOnly = (j) => Array.isArray(j?.permissions?.deny) && LAB_ONLY.some((r) => j.permissions.deny.includes(r));

// Remove the lab's own settings from `have`, keeping everything else. A single
// setting is removed only if it still has the lab's value.
function unmerge(have, labPart) {
  const out = { ...have };
  for (const [k, v] of Object.entries(labPart)) {
    if (Array.isArray(v) && Array.isArray(out[k])) {
      out[k] = out[k].filter((x) => !v.includes(x));
      if (!out[k].length) delete out[k];
    } else if (isObj(v) && isObj(out[k])) {
      out[k] = unmerge(out[k], v);
      if (!Object.keys(out[k]).length) delete out[k];
    } else if (!Array.isArray(v) && !isObj(v) && out[k] === v) {
      delete out[k];
    }
  }
  return out;
}

function finishRestore() {
  rmSync(backup, { force: true });
  rmSync(noneBefore, { force: true });
  rmSync(active, { force: true });
  writeFileSync(restored, 'Your settings were put back after the lab.\n');
}

// Write what's left after taking the lab's settings out (no file if nothing's left).
function writeLeft(left) {
  if (Object.keys(left).length) write(target, left);
  else rmSync(target, { force: true });
}

if (restore) {
  const exists = existsSync(target);
  let current = null;
  let broken = false;
  if (exists) {
    try { current = read(target); } catch { broken = true; }
  }
  const labIsIn = Boolean(current) && hasLabOnly(current);
  // While the lab is set up, the backup or the no-file marker is the record.
  // Without that (set up by an older version of this script, or already
  // restored), act only if the file still holds the lab's own settings.
  const inLab = existsSync(active);
  if (existsSync(backup) && (inLab || !exists || broken || labIsIn)) {
    // Put the backup back. Your current file is kept as the lab's copy.
    if (exists) copyFileSync(target, labCopy);
    let before = null;
    try { before = read(backup); } catch {}
    if (before && hasLabOnly(before)) {
      // An older version of this script overwrote the backup with the lab's
      // file. Your original can't be recovered, so take the lab's settings out.
      writeLeft(unmerge(before, lab));
      console.log('Put your settings back with the lab\'s settings taken out. Your backup had been');
      console.log('overwritten by an older version of this script, so anything you changed before');
      console.log('the lab may need setting again.');
    } else {
      copyFileSync(backup, target);
      console.log('Restored your own settings, exactly as they were before the lab.');
    }
    if (exists) console.log(`The lab's version is kept as ${labCopy}, in case you need it again.`);
    finishRestore();
  } else if (current && (inLab || labIsIn)) {
    // No backup: you had no settings file before the lab. Claude Code may have
    // added its own settings since (for example when the kit was installed).
    // Take the lab's settings out and keep the rest.
    copyFileSync(target, labCopy);
    const left = unmerge(current, lab);
    writeLeft(left);
    if (Object.keys(left).length) {
      console.log(`Took the lab's settings out of ${target}. Settings Claude Code added itself are kept.`);
    } else {
      console.log('You had no settings file before the lab, so the lab one has been removed.');
    }
    console.log(`The lab's version is kept as ${labCopy}, in case you need it again.`);
    finishRestore();
  } else if (broken) {
    console.error(`Your ${target} isn't valid JSON, so nothing was changed.`);
    console.error('Fix it (or ask your instructor), then run this again.');
    process.exit(1);
  } else if (inLab) {
    // The lab was set up from no file, and there's no file now.
    finishRestore();
    console.log('Nothing to restore: you had no settings file before the lab, and there is none now.');
  } else if (existsSync(restored)) {
    console.log('Your settings were already put back after the lab, so nothing was changed.');
  } else {
    console.log(`No sign of the lab's settings ${exists ? `in ${target}` : '(there is no settings file)'}, so nothing was changed.`);
  }
  process.exit(0);
}

// Merge `add` into `base`: lab values win for single settings, lists are unioned.
function merge(base, add) {
  const out = { ...base };
  for (const [k, v] of Object.entries(add)) {
    if (Array.isArray(v)) {
      const have = Array.isArray(out[k]) ? out[k] : [];
      out[k] = [...have, ...v.filter((x) => !have.includes(x))];
    } else if (isObj(v)) {
      out[k] = merge(isObj(out[k]) ? out[k] : {}, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

// Every lab setting present (lists may hold extra entries of yours).
function missing(have, want, path = '') {
  const gaps = [];
  for (const [k, v] of Object.entries(want)) {
    const p = path ? `${path}.${k}` : k;
    if (Array.isArray(v)) {
      const list = Array.isArray(have?.[k]) ? have[k] : [];
      for (const x of v) if (!list.includes(x)) gaps.push(`${p} is missing ${JSON.stringify(x)}`);
    } else if (isObj(v)) {
      gaps.push(...missing(isObj(have?.[k]) ? have[k] : {}, v, p));
    } else if (have?.[k] !== v) {
      gaps.push(`${p} should be ${JSON.stringify(v)}`);
    }
  }
  return gaps;
}

// Settings that switch auto mode off, wherever they are, or change its rules.
function autoModeOff(have) {
  const gaps = [];
  if (have?.disableAutoMode !== undefined) gaps.push('disableAutoMode switches auto mode off');
  if (have?.permissions?.disableAutoMode !== undefined) gaps.push('permissions.disableAutoMode switches auto mode off');
  if (have?.autoMode !== undefined) gaps.push('autoMode holds your own auto mode rules: setting up takes them out, --restore puts them back');
  return gaps;
}

let current = null;
if (existsSync(target)) {
  try {
    current = read(target);
  } catch (e) {
    console.error(`Your ${target} isn't valid JSON, so nothing was changed.`);
    console.error(`Fix it (or ask your instructor), then run this again. Detail: ${e.message}`);
    process.exit(1);
  }
}

if (checkOnly) {
  const gaps = [...missing(current ?? {}, lab), ...autoModeOff(current)];
  if (!current) console.log(`No settings file at ${target} yet.`);
  if (gaps.length) {
    console.log('Lab settings NOT in place:');
    for (const g of gaps) console.log(`  - ${g}`);
    process.exit(1);
  }
  console.log('Lab settings in place.');
  process.exit(0);
}

mkdirSync(dirname(target), { recursive: true });
// Setting up again after a restore starts a fresh record of what was there.
rmSync(restored, { force: true });
const startLab = () => writeFileSync(active, 'The lab is set up. Run --restore to put your settings back.\n');
if (!current) {
  write(target, lab);
  if (!existsSync(active)) {
    // Start of the lab, from no file. A backup left from an earlier run is out of date.
    rmSync(backup, { force: true });
    writeFileSync(noneBefore, 'There was no settings.json before the lab.\n');
    startLab();
  }
  console.log(`Created ${target} with the lab's settings.`);
} else {
  const gaps = [...missing(current, lab), ...autoModeOff(current)];
  if (!existsSync(active)) {
    if (!hasLabOnly(current)) {
      // Start of the lab: your file as it is now is the one to put back. Any
      // backup or marker left from an earlier run is out of date.
      rmSync(noneBefore, { force: true });
      copyFileSync(target, backup);
    } else if (!existsSync(backup)) {
      // The lab's settings are in, but there's no backup: an older version of
      // this script set this file up from no file at all.
      writeFileSync(noneBefore, 'There was no settings.json before the lab.\n');
    }
    startLab();
  }
  if (!gaps.length) {
    console.log(`${target} already has every lab setting. Nothing changed.`);
  } else {
    const merged = merge(current, lab);
    delete merged.disableAutoMode;
    delete merged.autoMode;
    if (isObj(merged.permissions)) delete merged.permissions.disableAutoMode;
    write(target, merged);
    console.log(`Added the lab's settings to ${target}, keeping yours.`);
    if (existsSync(backup)) console.log(`Your original is saved as ${backup}.`);
  }
}
console.log('Lab settings in place.');
