// Close hr.router's open conversations and in-progress interactions (DECISIONS, P14).
// A run that dies leaves its conversation open, and the platform then holds every later run.
// Your app can't close a conversation itself, so run this as a background script on your
// instance, in the global scope. It touches hr.router's records only, and counts a record only
// once it has read the new state back.
(function () {
    var HR_ROUTER = '978cf62cf3f9ef2b13807f6ce8029c3a'; // md5('sys_user:hr.router')
    var now = new GlideDateTime().getValue();

    // Sets fields, re-reads the record, and retries without business rules if the state
    // didn't stick. Returns true only if the record now has the wanted state.
    function close(table, id, fields) {
        for (var attempt = 0; attempt < 2; attempt++) {
            var gr = new GlideRecord(table);
            if (!gr.get(id)) return false;
            for (var f in fields) gr.setValue(f, fields[f]);
            if (attempt == 1) gr.setWorkflow(false);
            gr.update();
            var check = new GlideRecord(table);
            if (check.get(id) && check.getValue('state') == fields.state) return true;
        }
        return false;
    }

    var consumers = [];
    var c = new GlideRecord('sys_cs_consumer');
    c.addQuery('user_id', HR_ROUTER);
    c.query();
    while (c.next()) consumers.push(c.getUniqueValue());

    var closed = 0, stuck = 0;
    var conv = new GlideRecord('sys_cs_conversation');
    conv.addQuery('consumer', 'IN', consumers.join(','));
    conv.addQuery('state', 'open');
    conv.query();
    while (conv.next()) {
        if (close('sys_cs_conversation', conv.getUniqueValue(), { state: 'completed', conversation_completed: now })) closed++;
        else stuck++;
    }
    gs.print('Closed ' + closed + ' open conversation(s) of hr.router');
    if (stuck) gs.print('STILL OPEN: ' + stuck + ' conversation(s). Tell your instructor.');

    closed = 0; stuck = 0;
    var ix = new GlideRecord('interaction');
    ix.addQuery('opened_by', HR_ROUTER);
    ix.addQuery('state', 'work_in_progress');
    ix.query();
    while (ix.next()) {
        if (close('interaction', ix.getUniqueValue(), { state: 'closed_complete', active: false, closed_at: now })) closed++;
        else stuck++;
    }
    gs.print('Closed ' + closed + ' in-progress interaction(s) of hr.router');
    if (stuck) gs.print('STILL OPEN: ' + stuck + ' interaction(s). Tell your instructor.');
})();
