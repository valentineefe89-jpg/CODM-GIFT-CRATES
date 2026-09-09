const SUPABASE_URL = 'https://bfpwsqbzrwnznrbnoswi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-_L-PBjPFSCOVRJWfkwTig_9GikKfqa';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const rewards=document.querySelectorAll('.reward');
let selected='';
rewards.forEach(button=>{
  button.addEventListener('click',()=>{
    rewards.forEach(x=>x.classList.remove('active'));
    button.classList.add('active');
    selected=button.dataset.cp;
  });
});
document.querySelector('#claimForm').addEventListener('submit',e=>{
  e.preventDefault();
  const result=document.querySelector('#result');
  result.hidden=false;
  if(!selected){result.textContent='Please select a CP reward first.';return;}
  result.textContent='Claim request selected: '+selected+' CP.';
});
