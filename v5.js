/* Islamic Challenge 5.0 - additive gameplay layer. Uses the existing gameBridge save/cloud sync. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Baghdad',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const weekKey = () => { const d=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Baghdad'})); const x=new Date(d); x.setHours(0,0,0,0); x.setDate(x.getDate()-((x.getDay()+6)%7)); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`; };
  const seed = s => {let h=2166136261; for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);} return h>>>0;};
  const shuffle = (arr,n) => {const a=arr.slice();let x=n>>>0;for(let i=a.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
  const QUESTIONS = [
    {cat:'إسلامي',q:'كم عدد أركان الإسلام؟',a:['خمسة','أربعة','ستة','سبعة'],c:0,e:'أركان الإسلام خمسة كما في حديث ابن عمر رضي الله عنهما.'},
    {cat:'إسلامي',q:'ما السورة التي تُسمى قلب القرآن؟',a:['يس','البقرة','الإخلاص','الرحمن'],c:0,e:'اشتهر هذا الوصف لسورة يس، لكن الحديث الوارد فيه ضعيف؛ فلا نجزم بثبوته.'},
    {cat:'إسلامي',q:'ما اسم الغار الذي نزل فيه الوحي أول مرة؟',a:['حراء','ثور','أحد','النور'],c:0,e:'نزل الوحي على النبي ﷺ في غار حراء.'},
    {cat:'إسلامي',q:'كم عدد الصلوات المفروضة في اليوم والليلة؟',a:['خمس','ثلاث','أربع','ست'],c:0,e:'الصلوات المفروضة خمس في اليوم والليلة.'},
    {cat:'إسلامي',q:'ما أطول سورة في القرآن الكريم؟',a:['البقرة','آل عمران','النساء','المائدة'],c:0,e:'سورة البقرة هي أطول سور القرآن الكريم.'},
    {cat:'إسلامي',q:'من النبي الذي ابتلعه الحوت؟',a:['يونس عليه السلام','موسى عليه السلام','يوسف عليه السلام','هود عليه السلام'],c:0,e:'ابتلع الحوت يونس عليه السلام ثم نجاه الله.'},
    {cat:'إسلامي',q:'في أي شهر يصوم المسلمون رمضان؟',a:['رمضان','شعبان','شوال','محرم'],c:0,e:'صيام رمضان ركن من أركان الإسلام.'},
    {cat:'إسلامي',q:'ما القبلة التي يتجه إليها المسلمون في الصلاة؟',a:['الكعبة','المسجد الأقصى دائمًا','المسجد النبوي','جبل عرفات'],c:0,e:'يتجه المسلمون إلى الكعبة المشرفة في الصلاة.'},
    {cat:'إسلامي',q:'من أول الخلفاء الراشدين؟',a:['أبو بكر الصديق','عمر بن الخطاب','عثمان بن عفان','علي بن أبي طالب'],c:0,e:'أبو بكر الصديق رضي الله عنه أول الخلفاء الراشدين.'},
    {cat:'إسلامي',q:'ما الليلة التي هي خير من ألف شهر؟',a:['ليلة القدر','ليلة النصف من شعبان','ليلة الإسراء','ليلة العيد'],c:0,e:'قال تعالى: ليلة القدر خير من ألف شهر.'},
    {cat:'علوم',q:'ما الرمز الكيميائي للماء؟',a:['H₂O','CO₂','O₂','NaCl'],c:0,e:'يتكون الماء من ذرتي هيدروجين وذرة أكسجين.'},
    {cat:'علوم',q:'ما الكوكب المعروف بالكوكب الأحمر؟',a:['المريخ','الزهرة','المشتري','عطارد'],c:0,e:'يبدو المريخ أحمر بسبب أكاسيد الحديد على سطحه.'},
    {cat:'علوم',q:'ما وحدة قياس القوة في النظام الدولي؟',a:['نيوتن','جول','واط','باسكال'],c:0,e:'تقاس القوة بوحدة النيوتن.'},
    {cat:'علوم',q:'أي عضو يضخ الدم في جسم الإنسان؟',a:['القلب','الرئة','الكبد','الكلى'],c:0,e:'يضخ القلب الدم عبر الأوعية الدموية.'},
    {cat:'علوم',q:'ما الغاز الذي تمتصه النباتات في البناء الضوئي؟',a:['ثاني أكسيد الكربون','الأكسجين','النيتروجين','الهيدروجين'],c:0,e:'تستخدم النباتات ثاني أكسيد الكربون والماء والطاقة الضوئية.'},
    {cat:'علوم',q:'كم عدد كواكب المجموعة الشمسية؟',a:['ثمانية','سبعة','تسعة','عشرة'],c:0,e:'المجموعة الشمسية تضم ثمانية كواكب معروفة.'},
    {cat:'علوم',q:'ما أسرع حيوان بري؟',a:['الفهد','الأسد','الحصان','الغزال'],c:0,e:'الفهد الصياد أسرع الحيوانات البرية.'},
    {cat:'علوم',q:'ما الجزء المسؤول عن التحكم بمعظم أنشطة الخلية؟',a:['النواة','الغشاء','الجدار','السيتوبلازم'],c:0,e:'تحتوي النواة على المادة الوراثية وتدير أنشطة الخلية.'},
    {cat:'علوم',q:'عند أي درجة مئوية يتجمد الماء النقي تقريبًا؟',a:['0','10','-10','100'],c:0,e:'يتجمد الماء النقي عند صفر مئوية في الضغط الجوي القياسي.'},
    {cat:'علوم',q:'ما أقرب نجم إلى الأرض؟',a:['الشمس','الشعرى اليمانية','النجم القطبي','ألفا قنطورس'],c:0,e:'الشمس أقرب نجم إلى الأرض.'},
    {cat:'ذكاء',q:'ما العدد التالي: 2، 4، 8، 16، ؟',a:['32','24','30','36'],c:0,e:'كل عدد يساوي ضعف العدد السابق.'},
    {cat:'ذكاء',q:'إذا كان اليوم الثلاثاء، فما اليوم بعد 10 أيام؟',a:['الجمعة','الخميس','السبت','الأحد'],c:0,e:'بعد 7 أيام الثلاثاء، وبعد 3 أيام إضافية الجمعة.'},
    {cat:'ذكاء',q:'أي عدد لا ينتمي للمجموعة: 3، 5، 7، 9، 11؟',a:['9','3','5','7'],c:0,e:'الأعداد الأخرى أولية، أما 9 فهو عدد مركب.'},
    {cat:'ذكاء',q:'لدى أحمد 3 صناديق، في كل صندوق 4 كرات. كم كرة لديه؟',a:['12','7','9','16'],c:0,e:'3 × 4 = 12.'},
    {cat:'ذكاء',q:'ما نصف ربع العدد 80؟',a:['10','20','15','5'],c:0,e:'ربع 80 يساوي 20، ونصفه 10.'},
    {cat:'ذكاء',q:'أيهما أثقل: كيلوغرام حديد أم كيلوغرام قطن؟',a:['متساويان','الحديد','القطن','لا يمكن التحديد'],c:0,e:'كلاهما كيلوغرام واحد.'},
    {cat:'ذكاء',q:'إذا كان 5 عمال ينجزون 5 قطع في 5 دقائق، فكم يحتاج 10 عمال لإنجاز 10 قطع بالمعدل نفسه؟',a:['5 دقائق','10 دقائق','2.5 دقيقة','15 دقيقة'],c:0,e:'كل عامل ينجز قطعة في 5 دقائق؛ يعمل العشرة بالتوازي.'},
    {cat:'ذكاء',q:'ما العدد المفقود: 1، 1، 2، 3، 5، 8، ؟',a:['13','11','12','15'],c:0,e:'كل حد يساوي مجموع الحدين السابقين.'},
    {cat:'ذكاء',q:'إذا تجاوزتَ صاحب المركز الثاني في سباق، فما مركزك؟',a:['الثاني','الأول','الثالث','الرابع'],c:0,e:'تأخذ مركز الشخص الذي تجاوزته، أي المركز الثاني.'},
    {cat:'ذكاء',q:'كم شهرًا في السنة يحتوي على 28 يومًا على الأقل؟',a:['12','1','6','11'],c:0,e:'كل أشهر السنة تحتوي على 28 يومًا على الأقل.'}
  ];
  for (const cat of ['إسلامي','علوم','ذكاء']) QUESTIONS.filter(q=>q.cat===cat).forEach((q,i)=>q.diff=Math.min(3,1+Math.floor(i/3)));
  const ARTICLES = [
    {id:'pillars',cat:'الثقافة الإسلامية',title:'أركان الإسلام الخمسة',read:'3 دقائق',body:'يقوم الإسلام على خمسة أركان عظيمة: شهادة أن لا إله إلا الله وأن محمدًا رسول الله، وإقام الصلاة، وإيتاء الزكاة، وصوم رمضان، وحج البيت لمن استطاع إليه سبيلًا. وهي أساس ظاهر في عبادة المسلم وصلته بربه.',source:'حديث ابن عمر رضي الله عنهما، متفق عليه.',quiz:[{q:'كم عدد أركان الإسلام؟',a:['خمسة','ستة','أربعة','سبعة'],c:0},{q:'ما الركن الأول من أركان الإسلام؟',a:['الشهادتان','الصلاة','الزكاة','الصوم'],c:0},{q:'أي ركن يتعلق بإخراج جزء واجب من المال؟',a:['الزكاة','الحج','الصلاة','الصوم'],c:0},{q:'في أي شهر يكون الصيام المفروض؟',a:['رمضان','شوال','محرم','رجب'],c:0},{q:'على من يجب الحج؟',a:['من استطاع إليه سبيلًا','كل طفل','كل مسافر','من لا يملك نفقة'],c:0}]},

    {id:'hijra',cat:'السيرة النبوية',title:'الهجرة النبوية',read:'4 دقائق',body:'هاجر النبي محمد ﷺ من مكة إلى المدينة بعد اشتداد أذى المشركين للمسلمين. وصاحبه في الهجرة أبو بكر الصديق رضي الله عنه. وكانت الهجرة حدثًا مفصليًا في تاريخ الدعوة الإسلامية، واتخذ المسلمون منها مبدأً للتقويم الهجري في عهد عمر بن الخطاب رضي الله عنه.',source:'السيرة النبوية؛ أخبار الهجرة ثابتة في الصحيحين.',quiz:[{q:'من صاحب النبي ﷺ في الهجرة؟',a:['أبو بكر الصديق','عمر بن الخطاب','عثمان بن عفان','بلال بن رباح'],c:0},{q:'من أي مدينة هاجر النبي ﷺ؟',a:['مكة','الطائف','القدس','خيبر'],c:0},{q:'إلى أي مدينة كانت الهجرة؟',a:['المدينة المنورة','دمشق','الطائف','بغداد'],c:0},{q:'ما اسم الغار الذي مكث فيه النبي ﷺ وصاحبه؟',a:['غار ثور','غار حراء','غار أحد','غار النور'],c:0},{q:'من الخليفة الذي اتخذ الهجرة مبدأً للتقويم؟',a:['عمر بن الخطاب','أبو بكر الصديق','عثمان بن عفان','علي بن أبي طالب'],c:0}]},
    {id:'water',cat:'العلوم',title:'دورة الماء في الطبيعة',read:'3 دقائق',body:'تتحرك المياه باستمرار بين سطح الأرض والغلاف الجوي. تسخّن الشمس المياه فيحدث التبخر، ثم يبرد بخار الماء ويتكاثف مكونًا السحب، وبعدها يهطل المطر أو الثلج، وتعود المياه إلى الأنهار والبحار أو تتسرب إلى باطن الأرض.',source:'مفهوم علمي أساسي في علوم الأرض والمناخ.',quiz:[{q:'ما العملية التي يتحول فيها الماء السائل إلى بخار؟',a:['التبخر','التكاثف','الهطول','التجمد'],c:0},{q:'ما المصدر الأساسي للطاقة في دورة الماء؟',a:['الشمس','القمر','الرياح','التربة'],c:0},{q:'ماذا يسمى تحول بخار الماء إلى قطرات؟',a:['التكاثف','التبخر','الانصهار','التجمد'],c:0},{q:'ما الذي ينزل من السحب إلى الأرض؟',a:['الهطول','التبخر','التكاثف','التسامي'],c:0},{q:'أين تتجمع مياه كثيرة بعد الهطول؟',a:['الأنهار والبحار','الغيوم فقط','الشمس','الفضاء'],c:0}]},
    {id:'space',cat:'الفلك',title:'لماذا نرى أطوار القمر؟',read:'3 دقائق',body:'القمر لا يصدر ضوءًا من ذاته، بل يعكس ضوء الشمس. وأثناء دورانه حول الأرض نرى أجزاء مختلفة من نصفه المضاء، فتظهر أطواره مثل الهلال والتربيع والبدر. وتتكرر الدورة القمرية بانتظام.',source:'معلومة فلكية تعليمية.',quiz:[{q:'من أين يأتي الضوء الذي نراه على القمر؟',a:['يعكس ضوء الشمس','من داخله','من النجوم','من الأرض'],c:0},{q:'هل يصدر القمر ضوءًا من ذاته؟',a:['لا، يعكس ضوء الشمس','نعم دائمًا','يصدر ضوءًا كهربائيًا','يستمده من النجوم'],c:0},{q:'ما اسم الطور الذي يظهر فيه القمر كاملًا تقريبًا؟',a:['البدر','الهلال','المحاق','التربيع الأول'],c:0},{q:'حول ماذا يدور القمر؟',a:['الأرض','المريخ','الشمس فقط دون الأرض','الزهرة'],c:0},{q:'لماذا تتغير أطوار القمر؟',a:['نرى أجزاء مختلفة من نصفه المضاء','يتغير حجمه','ينطفئ ضوؤه','يتغير شكله الحقيقي'],c:0}]},
    {id:'cell',cat:'الأحياء',title:'الخلية وحدة بناء الكائن الحي',read:'4 دقائق',body:'الخلية هي الوحدة الأساسية في بناء الكائنات الحية ووظائفها. تختلف الخلايا في الشكل والحجم والوظيفة، وتحتوي الخلايا حقيقية النواة على نواة تضم المادة الوراثية، إضافة إلى عضيات تؤدي وظائف متخصصة.',source:'مبادئ علم الأحياء العام.',quiz:[{q:'ما الوحدة الأساسية لبناء الكائن الحي؟',a:['الخلية','النسيج','العضو','الجهاز'],c:0},{q:'أين توجد المادة الوراثية في الخلية حقيقية النواة؟',a:['النواة','الغشاء','السيتوبلازم فقط','الجدار'],c:0},{q:'ما وظيفة الغشاء الخلوي الأساسية؟',a:['تنظيم مرور المواد','إنتاج الضوء','حمل الأكسجين في الدم','هضم الطعام'],c:0},{q:'ماذا تسمى مجموعة خلايا متشابهة تؤدي وظيفة؟',a:['نسيج','جهاز','كائن حي','عضو'],c:0},{q:'هل تختلف الخلايا في الشكل والوظيفة؟',a:['نعم','لا، كلها متطابقة','تختلف في اللون فقط','لا توجد خلايا متخصصة'],c:0}]},
    {id:'logic',cat:'الذكاء والمنطق',title:'كيف نحل المسائل المنطقية؟',read:'2 دقائق',body:'ابدأ بتحديد المعطيات بدقة، ثم افصل المعلومات المؤكدة عن الافتراضات. ابحث عن نمط أو علاقة، واختبر الحل على جميع الشروط. إذا لم يطابق الحل شرطًا واحدًا، فأعد التفكير بدل التمسك به.',source:'إرشادات تعليمية في التفكير النقدي.',quiz:[{q:'ما أول خطوة مفيدة في حل مسألة منطقية؟',a:['تحديد المعطيات','اختيار أول جواب','تجاهل الشروط','التخمين'],c:0},{q:'لماذا نفصل المعلومات المؤكدة عن الافتراضات؟',a:['لمنع الاستنتاج الخاطئ','لزيادة التخمين','لتجاهل المعطيات','لتعقيد المسألة'],c:0},{q:'ماذا نفعل إذا خالف الحل أحد الشروط؟',a:['نعيد التفكير','نتجاهل الشرط','نقبل الحل مباشرة','نغير السؤال'],c:0},{q:'ما الذي يساعد على اكتشاف النمط؟',a:['مقارنة العلاقات بين المعطيات','اختيار جواب عشوائي','إهمال الأرقام','حذف الشروط'],c:0},{q:'متى نقبل الحل المنطقي؟',a:['عندما يطابق جميع الشروط','عندما يطابق شرطًا واحدًا','عندما يكون أسرع تخمين','دون اختبار'],c:0}]}
  ];

  const BOSSES=[
    {id:'guardian',name:'حارس المعرفة',cat:'إسلامي',icon:'☪',desc:'اختبر معرفتك بالثقافة الإسلامية.'},
    {id:'science',name:'سيد العلوم',cat:'علوم',icon:'⚛',desc:'تحديات في العلوم والطبيعة.'},
    {id:'riddles',name:'ملك الألغاز',cat:'ذكاء',icon:'♟',desc:'ألغاز تحتاج إلى تركيز واستنتاج.'},
    {id:'legend',name:'الزعيم الأسطوري',cat:'all',icon:'👑',desc:'مزيج نهائي من جميع المجالات.'}
  ];

  const weeklyNames=[
    ['أجب عن 20 سؤالًا إجابة صحيحة','أكمل مستويين من اللعبة','أكمل اختبارَي الموسوعة','أكمل التحدي اليومي','اهزم زعيمًا واحدًا'],
    ['اجمع 20 إجابة صحيحة','احصل على نتيجتي إكمال لمستويين','اجتز اختبارين من الموسوعة','أنهِ تحدي اليوم','انتصر على أحد الزعماء'],
    ['أجب إجابة صحيحة 20 مرة','أتمّ مستويين رئيسيين','أكمل اختبارَي مقالتين','أكمل أسئلة التحدي اليومي العشرة','اهزم زعيمًا']
  ];

  let tab='library', activeQuiz=null, activeBoss=null;

  function getState(){
    return window.gameBridge?.getState?.()||null;
  }

  function saveV5(){
    const s=getState();
    if(!s)return;
    s.v5=s.v5||{};
    s.v5.updatedAt=new Date().toISOString();
    window.gameBridge.save();
  }

  function data(){
    const s=getState();
    if(!s)return null;
    s.v5=s.v5||{};
    const v=s.v5;
    v.daily=v.daily||{date:today(),attempted:false,score:0,finished:false};
    if(v.daily.date!==today())v.daily={date:today(),attempted:false,score:0,finished:false};
    v.weekly=v.weekly||{key:weekKey(),done:[],rareDone:false};
    if(v.weekly.key!==weekKey())v.weekly={key:weekKey(),done:[],rareDone:false};
    v.library=v.library||{read:[],completed:[],favorites:[],suggestions:[]};
    v.boss=v.boss||{unlocked:0,defeated:[],best:{},attempts:{}};
    return v;
  }

  function reward(points,coins){
    const s=getState();
    if(!s)return;
    s.totalPoints=(s.totalPoints||0)+points;
    s.seasonPoints=(s.seasonPoints||0)+points;
    s.coins=(s.coins||0)+coins;
    saveV5();
  }

  function notify(title,msg){
    if(window.showAppToast)window.showAppToast(title,msg);
    else alert(title+'\n'+msg);
  }
  window.v5Tab=t=>{
    tab=t;
    document.querySelectorAll('[data-v5-tab]').forEach(b=>
      b.classList.toggle('selected',b.dataset.v5Tab===t)
    );
    render();
  };

  function render(){
    const root=$('v5Content');
    if(!root)return;
    const v=data();
    if(!v){
      root.innerHTML='<div class="v5-empty panel">ابدأ اللعب أولًا للوصول إلى أنظمة الإصدار 5.0.</div>';
      return;
    }
    if(tab==='library')renderLibrary(root,v);
    if(tab==='boss')renderBoss(root,v);
    if(tab==='daily')renderDaily(root,v);
    if(tab==='weekly')renderWeekly(root,v);
  }

  function renderLibrary(root,v){
    root.innerHTML=`
      <div class="v5-notice">
        المقالات متاحة مجانًا للجميع. المقالات المقترحة لا تُنشر تلقائيًا؛ يجب مراجعتها واعتمادها من المشرفين.
      </div>
      <div class="v5-grid">
        ${ARTICLES.map(a=>`
          <article class="v5-card panel">
            <span class="v5-tag">${esc(a.cat)}</span>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.body.slice(0,105))}…</p>
            <div class="v5-muted">
              ⏱ ${a.read} • ${v.library.read.includes(a.id)?'تمت القراءة':'لم تُقرأ بعد'}
            </div>
            <div class="v5-actions">
              <button class="small-btn" onclick="v5Read('${a.id}')">قراءة المقال</button>
              <button class="secondary-btn" onclick="v5Favorite('${a.id}')">
                ${v.library.favorites.includes(a.id)?'★ محفوظ':'☆ المفضلة'}
              </button>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="v5-card panel">
        <h3>✍️ اقترح مقالًا للموسوعة</h3>
        <p>أرسل عنوانًا ومحتوى ومصدرًا موثوقًا. لن يظهر اقتراحك للعامة قبل مراجعته واعتماده.</p>
        <div class="v5-field">
          <input id="v5SuggestTitle" maxlength="100" placeholder="عنوان المقال">
        </div>
        <div class="v5-field">
          <textarea id="v5SuggestBody" maxlength="4000" placeholder="اكتب المقال المقترح"></textarea>
        </div>
        <div class="v5-field">
          <input id="v5SuggestSource" maxlength="300" placeholder="المصدر أو المرجع">
        </div>
        <button class="primary-btn full" onclick="v5SubmitSuggestion()">إرسال للمراجعة</button>
        <p class="v5-muted">
          حالة الاقتراحات في هذه النسخة تُحفظ في ملف اللاعب محليًا. النشر الجماعي يتطلب تفعيل جدول المراجعة في Supabase.
        </p>
      </div>
    `;
  }

  window.v5Read=id=>{
    const v=data(),a=ARTICLES.find(x=>x.id===id);
    if(!a)return;
    v.library.read=[...new Set([...v.library.read,id])];
    saveV5();
    const root=$('v5Content');
    root.innerHTML=`
      <article class="v5-article panel">
        <button class="back-btn" onclick="v5Tab('library')">→ العودة للموسوعة</button>
        <span class="v5-tag">${esc(a.cat)} • ${a.read}</span>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.body)}</p>
        <div class="v5-source">المصدر: ${esc(a.source)}</div>
        <div class="v5-actions">
          <button class="primary-btn" onclick="v5ArticleQuiz('${id}')">اختبر فهمك + المكافأة</button>
          <button class="secondary-btn" onclick="v5Favorite('${id}')">☆ إضافة للمفضلة</button>
        </div>
      </article>
    `;
  };

  window.v5Favorite=id=>{
    const v=data();
    const a=v.library.favorites;
    if(a.includes(id))v.library.favorites=a.filter(x=>x!==id);
    else a.push(id);
    saveV5();
    render();
  };

  // اختبار الموسوعة: المكافأة بحسب الإجابات الصحيحة، وإعادة المحاولة عند صفر.
  window.v5ArticleQuiz=id=>{
    const v=data(),a=ARTICLES.find(x=>x.id===id);
    if(!v||!a)return;

    if(v.library.completed.includes(id)){
      notify('تم إكمال الاختبار','حصلت على مكافأته سابقًا.');
      return;
    }

    if(!Array.isArray(a.quiz)||a.quiz.length!==5){
      notify('الاختبار غير جاهز','هذا المقال لا يحتوي على خمسة أسئلة.');
      return;
    }

    showQuestion({
      title:a.title,
      questions:a.quiz,
      onDone:score=>{
        if(v.library.completed.includes(id))return;

        const correct=Math.max(0,Math.min(5,Math.floor(Number(score)||0)));

        if(correct===0){
          notify('انتهى الاختبار','لم تجب إجابة صحيحة، لذلك لم تحصل على مكافأة. يمكنك إعادة المحاولة.');
          render();
          return;
        }

        v.library.completed.push(id);
        const xp=correct;
        const coins=Math.floor(correct*3/5);
        reward(xp,coins);
        saveV5();

        notify('انتهى الاختبار',`نتيجتك ${correct}/5. مكافأتك ${xp} نقاط خبرة و${coins} عملات.`);
        render();
      }
    });
  };

  window.v5SubmitSuggestion=()=>{
    const v=data();
    const title=$('v5SuggestTitle')?.value.trim();
    const body=$('v5SuggestBody')?.value.trim();
    const source=$('v5SuggestSource')?.value.trim();

    if(!title||body?.length<40||!source){
      notify('بيانات غير مكتملة','أدخل عنوانًا ومحتوى لا يقل عن 40 حرفًا ومصدرًا.');
      return;
    }

    v.library.suggestions.push({
      title,body,source,
      status:'pending',
      createdAt:new Date().toISOString()
    });

    saveV5();
    notify('تم حفظ الاقتراح','اقتراحك محفوظ في هذا الجهاز بانتظار المراجعة.');
    render();
  };
  function showQuestion({title,questions,onDone}){
    let i=0,score=0;
    activeQuiz={title,questions,onDone};

    renderQ();

    function renderQ(){
      const root=$('v5Content');
      const q=questions[i];

      root.innerHTML=`
        <div class="v5-question panel">
          <button class="back-btn" onclick="v5Tab('library')">إغلاق</button>
          <div class="v5-muted">${esc(title)} • ${i+1}/${questions.length}</div>
          <div class="v5-progress">
            <i style="width:${i/questions.length*100}%"></i>
          </div>
          <h3>${esc(q.q)}</h3>
          <div class="v5-options">
            ${q.a.map((x,n)=>`
              <button class="v5-option" onclick="v5Answer(${n})">${esc(x)}</button>
            `).join('')}
          </div>
          <p id="v5QFeedback" class="v5-muted"></p>
          <button id="v5QNext" class="primary-btn full hidden" onclick="v5Next()">متابعة</button>
        </div>
      `;

      window.v5Answer=n=>{
        const q=questions[i];
        const bs=[...root.querySelectorAll('.v5-option')];

        bs.forEach((b,j)=>{
          b.disabled=true;
          if(j===q.c)b.classList.add('correct');
          if(j===n&&n!==q.c)b.classList.add('wrong');
        });

        if(n===q.c)score++;

        $('v5QFeedback').textContent=q.e||'';
        $('v5QNext').classList.remove('hidden');
      };

      window.v5Next=()=>{
        if(i<questions.length-1){
          i++;
          renderQ();
        }else{
          root.innerHTML=`
            <div class="v5-question panel">
              <h2>انتهى الاختبار</h2>
              <p>نتيجتك: ${score}/${questions.length}</p>
              <button class="primary-btn full" id="v5Finish">إنهاء</button>
            </div>
          `;

          $('v5Finish').onclick=()=>onDone(score);
        };
      };
    }
  }

  function renderDaily(root,v){
    const done=v.daily.finished;

    root.innerHTML=`
      <div class="v5-card panel">
        <span class="v5-tag">تحدٍ موحد • بلا مؤقت</span>
        <h2>🎯 تحدي اليوم</h2>
        <p>
          10 أسئلة ثابتة لجميع اللاعبين في تاريخ ${today()}، ومحاولة واحدة فقط.
          يمكنك متابعة المحاولة بعد إعادة تحميل الصفحة على الجهاز نفسه.
        </p>

        <div class="v5-stat">
          <span>المحاولات</span>
          <b>${v.daily.attempted?'1 / 1':'0 / 1'}</b>
        </div>

        <div class="v5-stat">
          <span>النتيجة</span>
          <b>${v.daily.score||0} / 10</b>
        </div>

        <div class="v5-stat">
          <span>الحالة</span>
          <b>${done?'مكتمل':v.daily.attempted?'قيد التقدم':'لم يبدأ'}</b>
        </div>

        ${done
          ?'<div class="v5-notice">اكتملت محاولة اليوم. عد غدًا لتحدٍ جديد.</div>'
          :`<button class="primary-btn full" onclick="v5StartDaily()">
              ${v.daily.attempted?'متابعة التحدي':'ابدأ المحاولة الوحيدة'}
            </button>`
        }

        <p class="v5-muted">
          ملاحظة: لوحة ترتيب عالمية موحدة تتطلب تسجيل النتائج عبر خادم Supabase، وهي غير مفعلة في هذه الواجهة الأولية.
        </p>
      </div>
    `;
  }

  window.v5StartDaily=()=>{
    const v=data();
    if(v.daily.finished)return;

    if(!v.daily.attempted){
      v.daily.attempted=true;
      v.daily.index=0;
      v.daily.score=0;
      v.daily.order=shuffle(QUESTIONS,seed(today()))
        .map(q=>QUESTIONS.indexOf(q))
        .slice(0,10);
      saveV5();
    }

    runDaily();
  };

  function runDaily(){
    const v=data();
    const order=v.daily.order||[];
    let i=v.daily.index||0;

    function draw(){
      const q=QUESTIONS[order[i]];
      const root=$('v5Content');

      root.innerHTML=`
        <div class="v5-question panel">
          <div class="v5-muted">تحدي اليوم • السؤال ${i+1} من 10</div>
          <div class="v5-progress">
            <i style="width:${i*10}%"></i>
          </div>
          <h3>${esc(q.q)}</h3>
          <div class="v5-options">
            ${q.a.map((a,n)=>`
              <button class="v5-option" onclick="v5DailyAnswer(${n})">${esc(a)}</button>
            `).join('')}
          </div>
          <p id="v5DailyFeedback" class="v5-muted"></p>
          <button id="v5DailyNext" class="primary-btn full hidden" onclick="v5DailyNext()">
            ${i===9?'إنهاء التحدي':'السؤال التالي'}
          </button>
        </div>
      `;

      window.v5DailyAnswer=n=>{
        const bs=[...root.querySelectorAll('.v5-option')];

        bs.forEach((b,j)=>{
          b.disabled=true;
          if(j===q.c)b.classList.add('correct');
          if(j===n&&j!==q.c)b.classList.add('wrong');
        });

        if(n===q.c)v.daily.score++;

        $('v5DailyFeedback').textContent=q.e;
        v.daily.index=i+1;
        saveV5();
        $('v5DailyNext').classList.remove('hidden');
      };

      window.v5DailyNext=()=>{
        if(i<9){
          i++;
          draw();
        }else{
          v.daily.finished=true;
          saveV5();

          const pts=v.daily.score*2;
          const coins=Math.floor(v.daily.score/2);

          if(v.daily.score>0)reward(pts,coins);
          else saveV5();

          root.innerHTML=`
            <div class="v5-question panel">
              <h2>انتهى تحدي اليوم 🏆</h2>
              <div class="score-ring">
                <strong>${v.daily.score}</strong>
                <span>/ 10</span>
              </div>
              <p>
                ${v.daily.score===0
                  ?'لم تحصل على إجابات صحيحة، لذلك لا توجد مكافأة.'
                  :`مكافأتك: ${pts} نقطة خبرة و${coins} عملة.`
                }
              </p>
              <button class="primary-btn full" onclick="v5Tab('daily')">العودة</button>
            </div>
          `;
        }
      };
    }

    draw();
  }
  function weeklyStatus(v){
    const s=getState()||{};

    const conditions=[
      (s.correct||0)>=20,
      (s.levelScores||[]).filter(x=>x!==null).length>=2,
      v.library.completed.length>=2,
      v.daily.finished,
      v.boss.defeated.length>=1
    ];

    let gained=false;

    conditions.forEach((ok,i)=>{
      if(ok&&!v.weekly.done.includes(i)){
        v.weekly.done.push(i);
        reward(i===4?25:5,i===4?20:4);
        gained=true;
      }
    });

    if(v.weekly.done.length===5&&!v.weekly.bonus){
      v.weekly.bonus=true;
      reward(15,10);
      gained=true;
    }

    if(gained)saveV5();

    return conditions;
  }

  function renderWeekly(root,v){
    const choices=weeklyNames[seed(weekKey())%weeklyNames.length];
    const conditions=weeklyStatus(v);

    root.innerHTML=`
      <div class="v5-card panel">
        <span class="v5-tag">تتجدد كل أسبوع</span>
        <h2>📅 المهام الأسبوعية</h2>
        <p>أكمل خمس مهام متنوعة. المهمة الخامسة نادرة وتمنح مكافأة أسطورية.</p>

        <div class="v5-progress">
          <i style="width:${v.weekly.done.length/5*100}%"></i>
        </div>

        <p>${v.weekly.done.length} من 5 مهام مكتملة</p>

        ${choices.map((name,i)=>`
          <div class="v5-stat">
            <span>${i===4?'🌟 مهمة نادرة • ':''}${esc(name)}</span>
            <b>${conditions[i]?'مكتملة ✓':i===4?'أسطورية':'قيد التقدم'}</b>
          </div>
        `).join('')}

        <div class="v5-notice">
          تُحتسب المهام تلقائيًا من تقدمك: 20 إجابة صحيحة، إكمال مستويين، إكمال اختبارَي موسوعة، إكمال التحدي اليومي، وهزيمة زعيم.
          المهمة الخامسة نادرة وتمنح مكافأة أسطورية.
        </div>

        ${v.weekly.done.length===5
          ?'<p class="v5-tag">مكافأة إكمال الأسبوع جاهزة</p>'
          :''
        }
      </div>
    `;
  }

  function renderBoss(root,v){
    root.innerHTML=`
      <div class="v5-notice">
        كل زعيم يتكون من 5 مراحل × 5 أسئلة. لديك 3 إجابات خاطئة طوال المواجهة.
        عند الخسارة تعود إلى البداية، وتتغير مجموعة الأسئلة في المحاولة التالية.
      </div>

      <div class="v5-grid">
        ${BOSSES.map((b,i)=>`
          <article class="v5-card panel">
            <div style="font-size:34px">${b.icon}</div>

            <span class="v5-tag">
              ${i+1===v.boss.unlocked+1?'متاح':i<v.boss.unlocked?'تم فتحه':'مقفل'}
            </span>

            <h3>${esc(b.name)}</h3>
            <p>${esc(b.desc)}</p>

            <div class="v5-muted">
              أفضل نتيجة: ${v.boss.best[b.id]??'—'} / 25
            </div>

            <button
              class="primary-btn full"
              ${i>v.boss.unlocked?'disabled':''}
              onclick="v5StartBoss(${i})"
            >
              ${v.boss.defeated.includes(b.id)?'إعادة التحدي':'ابدأ المواجهة'}
            </button>
          </article>
        `).join('')}
      </div>
    `;
  }

  window.v5StartBoss=i=>{
    const v=data(),boss=BOSSES[i];

    if(!v||!boss||i>v.boss.unlocked)return;

    const primary=QUESTIONS.filter(q=>boss.cat==='all'||q.cat===boss.cat);
    const secondary=QUESTIONS.filter(q=>!primary.includes(q));
    const pool=[...primary,...secondary];

    const prev=v.boss.attempts[boss.id]||0;
    v.boss.attempts[boss.id]=prev+1;

    // احفظ رقم المحاولة قبل عرض أول سؤال حتى لا تضيع عند إعادة التحميل.
    saveV5();

    const ordered=[1,2,3].flatMap(d=>
      shuffle(
        pool.filter(q=>q.diff===d),
        seed(today()+boss.id+'-'+d+'-'+prev)
      )
    );

    const order=ordered.slice(0,25);

    activeBoss={
      i,boss,order,
      at:0,
      wrong:0,
      score:0
    };

    bossDraw();
  };

  function bossDraw(){
    const b=activeBoss;
    if(!b)return;

    const q=b.order[b.at];
    const stage=Math.floor(b.at/5)+1;
    const root=$('v5Content');

    root.innerHTML=`
      <div class="v5-boss panel">
        <span class="v5-tag">${esc(b.boss.name)}</span>

        <h2>المرحلة ${stage} من 5</h2>

        <div class="v5-progress">
          <i style="width:${b.at/25*100}%"></i>
        </div>

        <div class="v5-stat">
          <span>الأسئلة</span>
          <b>${b.at+1}/25</b>
        </div>

        <div class="v5-stat">
          <span>الإجابات الخاطئة المتبقية</span>
          <b class="v5-heart">
            ${'♥ '.repeat(3-b.wrong)}${'♡ '.repeat(b.wrong)}
          </b>
        </div>

        <div class="v5-stat">
          <span>الصعوبة</span>
          <b>${stage<=2?'سهل':stage<=4?'متوسط':'صعب'}</b>
        </div>

        <div class="v5-question">
          <h3>${esc(q.q)}</h3>

          <div class="v5-options">
            ${q.a.map((a,n)=>`
              <button class="v5-option" onclick="v5BossAnswer(${n})">
                ${esc(a)}
              </button>
            `).join('')}
          </div>

          <p id="v5BossFeedback" class="v5-muted"></p>

          <button id="v5BossNext" class="primary-btn full hidden" onclick="v5BossNext()">
            متابعة
          </button>
        </div>
      </div>
    `;

    window.v5BossAnswer=n=>{
      const bs=[...root.querySelectorAll('.v5-option')];

      bs.forEach((x,j)=>{
        x.disabled=true;
        if(j===q.c)x.classList.add('correct');
        if(j===n&&n!==q.c)x.classList.add('wrong');
      });

      if(n===q.c)b.score++;
      else b.wrong++;

      $('v5BossFeedback').textContent=q.e;
      $('v5BossNext').classList.remove('hidden');

      if(b.wrong>=3){
        $('v5BossNext').textContent='انتهت المحاولة';
      }
    };

    window.v5BossNext=()=>{
      if(b.wrong>=3){
        const v=data();

        v.boss.best[b.boss.id]=Math.max(
          v.boss.best[b.boss.id]||0,
          b.score
        );

        saveV5();

        root.innerHTML=`
          <div class="v5-boss panel">
            <h2>انتهت المواجهة</h2>
            <p>استنفدت المحاولات الثلاث. ستبدأ المحاولة القادمة من المرحلة الأولى بأسئلة مختلفة.</p>
            <p>نتيجتك: ${b.score}/25</p>
            <button class="primary-btn full" onclick="v5Tab('boss')">
              العودة إلى الزعماء
            </button>
          </div>
        `;

        activeBoss=null;
        return;
      }

      if(b.at<24){
        b.at++;
        bossDraw();
      }else{
        const v=data();

        v.boss.best[b.boss.id]=Math.max(
          v.boss.best[b.boss.id]||0,
          b.score
        );

        const firstVictory=!v.boss.defeated.includes(b.boss.id);

        v.boss.defeated=[
          ...new Set([...v.boss.defeated,b.boss.id])
        ];

        v.boss.unlocked=Math.max(
          v.boss.unlocked,
          Math.min(3,b.i+1)
        );

        saveV5();

        // مكافأة هزيمة الزعيم تُمنح مرة واحدة فقط لكل زعيم.
        if(firstVictory)reward(30,25);

        root.innerHTML=`
          <div class="v5-boss panel">
            <h2>هُزم الزعيم! 👑</h2>
            <p>${firstVictory
              ?'أكملت 25 سؤالًا بنجاح وحصلت على 30 نقطة خبرة و25 عملة.'
              :'أكملت المواجهة مرة أخرى. سبق أن حصلت على مكافأة هذا الزعيم.'}</p>
            <p>لقب الإنجاز: ${esc(b.boss.name)} المنتصر</p>
            <button class="primary-btn full" onclick="v5Tab('boss')">
              متابعة
            </button>
          </div>
        `;

        activeBoss=null;
      }
    };
  }

  window.addEventListener('load',()=>{
    const nav=document.querySelector('[data-page="v5"]');

    if(nav){
      nav.addEventListener('click',()=>{
        tab='library';
        render();
      });
    }
  });

  const originalShow=window.showPage;

  window.showPage=function(page){
    originalShow?.(page);
    if(page==='v5')render();
  };

  window.v5Debug={
    articles:ARTICLES.length,
    questions:QUESTIONS.length,
    bosses:BOSSES.length
  };

})();
