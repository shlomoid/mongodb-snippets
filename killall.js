function killall(ns, wet_run) {
    ns = (typeof (wet_run) != 'undefined') ? ns : "";
    wet_run = (typeof (wet_run) != 'undefined') ? wet_run : false;
    inprog = db.currentOp().inprog;
    for (var i in inprog) {
        var op = inprog[i];
        if (op.ns.indexOf(ns) != -1) {
            if (wet_run == true) {
                db.killOp(op.opid);
            } else {
                var toprint = {}
                toprint.opid = op.opid;
                toprint.secs_running = op.secs_running;
                toprint.client = op.client;
                printjsononeline(toprint);
            }
        }
    }
}

