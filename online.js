/* اتصال الحسابات والمزامنة ولوحة المتصدرين عبر Supabase. */
(() => {
  const cfg = window.SUPABASE_CONFIG || {};
  const ready = !!(window.supabase && cfg.url && cfg.publishableKey &&
    !cfg.url.includes('YOUR_') && !cfg.publishableKey.includes('YOUR_'));
  const statusEl = () => document.getElementById('onlineStatus');
  const say = (message) => { const el = statusEl(); if (el) el.textContent = message; };
  let client = null;
  let syncing = false;
  let syncTimer = null;
  let applyingCloud = false;
  window.onlineUser = null;

  if (ready) {
    client = window.supabase.createClient(cfg.url, cfg.publishableKey);
    client.auth.getSession().then(({ data, error }) => {
      if (error) return say('تعذر التحقق من الجلسة: ' + error.message);
      if (data.session) restoreCloudProfile(data.session.user);
      else say('اتصال Supabase جاهز. سجّل الدخول لمزامنة تقدمك.');
    });
    client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') { window.onlineUser = null; say('تم تسجيل الخروج. يمكنك مواصلة اللعب كضيف.'); }
      if (event === 'SIGNED_IN' && session?.user) restoreCloudProfile(session.user);
    });
  } else {
    say('أكمل إعداد supabase-config.js وقاعدة البيانات لفتح الحسابات والمزامنة أونلاين.');
  }

  function ensureReady() {
    if (!client) { say('لم يتم إعداد Supabase بعد. افتح README_AR.md وأكمل خطوات الربط.'); return false; }
    return true;
  }
  function credentials() {
    const email = document.getElementById('accountEmail')?.value.trim() || '';
    const password = document.getElementById('accountPassword')?.value || '';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { say('اكتب بريدًا إلكترونيًا صحيحًا.'); return null; }
    if (password.length < 8) { say('كلمة المرور يجب أن تكون 8 أحرف على الأقل.'); return null; }
    return { email, password };
  }
  window.onlineSignUp = async () => {
    if (!ensureReady()) return;
    const c = credentials(); if (!c) return;
    say('جارٍ إنشاء الحساب...');
    const { data, error } = await client.auth.signUp(c);
    if (error) return say('تعذر إنشاء الحساب: ' + error.message);
    if (data.session && data.user) await restoreCloudProfile(data.user);
    else say('تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيده، ثم سجّل الدخول.');
  };
  window.onlineSignIn = async () => {
    if (!ensureReady()) return;
    const c = credentials(); if (!c) return;
    say('جارٍ تسجيل الدخول...');
    const { data, error } = await client.auth.signInWithPassword(c);
    if (error) return say('تعذر تسجيل الدخول: ' + error.message);
    await restoreCloudProfile(data.user);
  };
  window.onlineSignOut = async () => {
    if (!ensureReady()) return;
    const { error } = await client.auth.signOut();
    say(error ? 'تعذر تسجيل الخروج: ' + error.message : 'تم تسجيل الخروج من الحساب.');
  };

  async function restoreCloudProfile(user) {
    if (!client || !user) return;
    window.onlineUser = user;
    say('تم تسجيل الدخول. جارٍ تحميل تقدمك السحابي...');
    const { data, error } = await client.from('player_profiles').select('username,game_state,total_points').eq('id', user.id).maybeSingle();
    if (error) return say('تم تسجيل الدخول، لكن تعذر تحميل التقدم: ' + error.message);
    if (data?.game_state) {
      applyingCloud = true;
      const cloudState = data.game_state;
      if (window.gameBridge) window.gameBridge.setState(cloudState);
      applyingCloud = false;
      say('تم تحميل تقدمك من السحابة بنجاح.');
    } else {
      const local = window.gameBridge?.getState?.();
      if (local) await syncNow(local);
      say('الحساب جاهز. تم ربط تقدم هذا الجهاز بحسابك.');
    }
  }

  window.onlineSyncState = (gameState) => {
    if (!client || !window.onlineUser || applyingCloud || syncing) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => syncNow(gameState), 900);
  };
  async function syncNow(gameState) {
    if (!client || !window.onlineUser || !gameState || syncing) return;
    syncing = true;
    const row = {
      id: window.onlineUser.id,
      username: String(gameState.name || 'Player').slice(0, 18),
      total_points: Number(gameState.totalPoints || 0),
      game_state: gameState,
      updated_at: new Date().toISOString()
    };
    const { error } = await client.from('player_profiles').upsert(row, { onConflict: 'id' });
    syncing = false;
    if (error) say('تعذرت مزامنة التقدم: ' + error.message);
  }

  window.loadLeaderboard = async () => {
    const status = document.getElementById('leaderboardStatus');
    const list = document.getElementById('leaderboardList');
    if (!status || !list) return;
    if (!client) { status.textContent = 'لوحة المتصدرين تحتاج إكمال إعداد Supabase أولًا.'; list.innerHTML = ''; return; }
    status.textContent = 'جارٍ تحميل أفضل اللاعبين...';
    const { data, error } = await client.from('player_profiles')
      .select('username,total_points,updated_at').order('total_points', { ascending: false }).limit(50);
    if (error) { status.textContent = 'تعذر تحميل المتصدرين: ' + error.message; list.innerHTML = ''; return; }
    if (!data?.length) { status.textContent = 'لا يوجد لاعبون في لوحة المتصدرين حتى الآن. كن أول المتصدرين!'; list.innerHTML = ''; return; }
    status.textContent = 'أفضل 50 لاعبًا حسب مجموع النقاط';
    list.innerHTML = data.map((player, i) => `<div class="leader-row panel ${i < 3 ? 'top-three' : ''}"><span class="leader-rank">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</span><b class="leader-name"></b><strong>${Number(player.total_points)||0} نقطة</strong></div>`).join('');
    [...list.querySelectorAll('.leader-name')].forEach((el, i) => { el.textContent = data[i].username || 'لاعب'; });
  };
})();
