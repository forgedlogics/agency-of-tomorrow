const {test}=require('node:test');
const assert=require('node:assert/strict');
const {economics}=require('../luxury.js');
const base={aov:3000,margin:50,orders:1,years:3,discount:10,acquisition:200,spend:1500,tn:100,tc:10,cn:100,cc:5};
test('profit uses margin, discounts annual cash flow and compares holdout rates',()=>{
 const r=economics(base); assert.ok(Math.abs(r.ltv-(1500/1.1+1500/1.1**2+1500/1.1**3-200))<.001);
 assert.equal(r.incremental,5); assert.equal(r.net,6000); assert.equal(r.breakEven,1); assert.equal(r.roi,4);
});
test('unequal groups are normalized and negative lift remains negative',()=>{
 const r=economics({...base,tn:200,tc:4}); assert.ok(Math.abs(r.incremental+6)<1e-9); assert.ok(Math.abs(r.net+10500)<1e-9);
});
test('zero margin and zero spend avoid infinite outputs',()=>{
 const r=economics({...base,margin:0,spend:0}); assert.equal(r.breakEven,null);assert.equal(r.roi,null);assert.equal(r.ltv,-200);
});
test('reject impossible conversion counts and malformed horizons',()=>{
 for(const patch of [{tc:101},{tn:0},{cc:-1},{margin:101},{years:2.5},{spend:'oops'},{tn:1.5}]) assert.throws(()=>economics({...base,...patch}));
});
