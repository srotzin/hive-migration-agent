'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3035;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/migration'));
app.get('/',(_,r)=>r.json({service:'hive-migration-agent',version:'1.0.0',description:'Agent migration assistant — onboard agents from other ecosystems, data portability, protocol translation',endpoints:{execute:'POST /v1/migration/execute',record:'GET /v1/migration/record/:id',stats:'GET /v1/migration/stats',records:'GET /v1/migration/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-migration-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
