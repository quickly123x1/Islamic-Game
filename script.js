const QUESTIONS = [
[
{q:"كم عدد أركان الإسلام؟",a:["ثلاثة","أربعة","خمسة","ستة"],c:2,e:"أركان الإسلام خمسة، كما ورد في حديث بني الإسلام على خمس."},
{q:"ما الكتاب الذي أُنزل على النبي محمد ﷺ؟",a:["التوراة","القرآن الكريم","الإنجيل","الزبور"],c:1,e:"أنزل الله القرآن الكريم على النبي محمد ﷺ."},
{q:"كم عدد الصلوات المفروضة في اليوم والليلة؟",a:["ثلاث","أربع","خمس","ست"],c:2,e:"الصلوات المفروضة خمس."},
{q:"إلى أين يتجه المسلمون في الصلاة؟",a:["المسجد الأقصى","الكعبة","المسجد النبوي","جبل عرفات"],c:1,e:"قبلة المسلمين هي الكعبة المشرفة في مكة المكرمة."},
{q:"في أي شهر يصوم المسلمون؟",a:["شعبان","محرم","رمضان","شوال"],c:2,e:"فرض صيام شهر رمضان على المسلمين."},
{q:"ما السورة التي تُسمى أم الكتاب؟",a:["البقرة","الفاتحة","الإخلاص","الناس"],c:1,e:"سورة الفاتحة تُسمى أم الكتاب وأم القرآن."},
{q:"كم عدد أجزاء القرآن الكريم؟",a:["20","25","30","40"],c:2,e:"القرآن الكريم مقسم إلى ثلاثين جزءًا."},
{q:"من أول الخلفاء الراشدين؟",a:["عمر بن الخطاب","عثمان بن عفان","علي بن أبي طالب","أبو بكر الصديق"],c:3,e:"أبو بكر الصديق رضي الله عنه أول الخلفاء الراشدين."},
{q:"في أي غار نزل الوحي أول مرة؟",a:["غار ثور","غار حراء","غار أحد","غار النور"],c:1,e:"نزل الوحي أول مرة على النبي ﷺ في غار حراء."},
{q:"كم عدد سور القرآن الكريم؟",a:["110","112","114","116"],c:2,e:"عدد سور القرآن الكريم 114 سورة."},
{q:"ما السورة التي لا تبدأ بالبسملة؟",a:["الأنفال","التوبة","يونس","هود"],c:1,e:"سورة التوبة لا تبدأ بالبسملة."},
{q:"من النبي الذي ابتلعه الحوت؟",a:["موسى عليه السلام","يونس عليه السلام","نوح عليه السلام","صالح عليه السلام"],c:1,e:"النبي يونس عليه السلام التقمه الحوت."},
{q:"ما اسم الصلح الذي عُقد بين المسلمين وقريش في السنة السادسة للهجرة؟",a:["صلح الحديبية","صلح الرملة","صلح بدر","صلح الطائف"],c:0,e:"عُقد صلح الحديبية في السنة السادسة للهجرة."},
{q:"من الصحابي الملقب بذي النورين؟",a:["علي بن أبي طالب","عمر بن الخطاب","عثمان بن عفان","طلحة بن عبيد الله"],c:2,e:"عثمان بن عفان رضي الله عنه لُقب بذي النورين."},
{q:"ما أطول آية في القرآن الكريم؟",a:["آية الكرسي","آية الدين","آخر آية من البقرة","آية النور"],c:1,e:"أطول آية هي آية الدين في سورة البقرة، الآية 282."}
],
[
{q:"إذا أخذتَ تفاحتين من ثلاث تفاحات، فكم تفاحة أصبحت معك؟",a:["واحدة","اثنتان","ثلاث","خمس"],c:1,e:"أخذت تفاحتين، إذن أصبحت معك تفاحتان."},
{q:"ما العدد التالي في السلسلة: 2، 4، 6، 8، ...؟",a:["9","10","11","12"],c:1,e:"نضيف 2 في كل مرة، فالعدد التالي 10."},
{q:"لدى أسرة 4 بنات، ولكل بنت أخ واحد. كم عدد الأبناء جميعًا؟",a:["5","8","4","9"],c:0,e:"الأخ واحد مشترك بين البنات الأربع؛ المجموع 5 أبناء."},
{q:"أي شهر يحتوي على 28 يومًا؟",a:["فبراير فقط","يناير","كل الشهور","يونيو"],c:2,e:"كل الشهور تحتوي على 28 يومًا على الأقل."},
{q:"إذا كانت الساعة 3:15، فما الزاوية الصغرى تقريبًا بين عقربي الساعة؟",a:["0 درجة","7.5 درجات","15 درجة","30 درجة"],c:1,e:"عقرب الدقائق عند 90° وعقرب الساعات عند 97.5°؛ الفرق 7.5°."},
{q:"أكمل النمط: 1، 4، 9، 16، 25، ...",a:["30","32","36","49"],c:2,e:"هذه مربعات الأعداد 1 إلى 5؛ التالي 6² ويساوي 36."},
{q:"ثلاث آلات تصنع ثلاث قطع في ثلاث دقائق. كم تحتاج 100 آلة لصنع 100 قطعة؟",a:["3 دقائق","30 دقيقة","100 دقيقة","300 دقيقة"],c:0,e:"كل آلة تصنع قطعة في 3 دقائق؛ تعمل الآلات معًا، فتحتاج 3 دقائق."},
{q:"أب عمره 40 سنة وابنه 10 سنوات. بعد كم سنة يصبح عمر الأب ضعف عمر الابن؟",a:["10","15","20","25"],c:2,e:"بعد 20 سنة: الأب 60 والابن 30."},
{q:"إذا كان ضعف عدد زائد 5 يساوي 17، فما العدد؟",a:["5","6","7","8"],c:1,e:"2x + 5 = 17، إذن 2x = 12 والعدد 6.",fix:true},
{q:"في سباق، تجاوزتَ صاحب المركز الثاني. ما مركزك الآن؟",a:["الأول","الثاني","الثالث","الرابع"],c:1,e:"أخذت مكان صاحب المركز الثاني، فأصبحت ثانيًا."},
{q:"ما العدد الذي إذا قسمته على نصف ثم أضفت 10 أصبح الناتج 30؟",a:["5","10","15","20"],c:1,e:"10 ÷ 0.5 = 20، ثم +10 = 30."},
{q:"لديك 9 كرات متشابهة، واحدة أثقل قليلًا. ما أقل عدد من الوزنات بميزان كفتين لمعرفة الأثقل؟",a:["1","2","3","4"],c:1,e:"قسّمها إلى ثلاث مجموعات من 3. وزنة تحدد المجموعة، ووزنة ثانية تحدد الكرة."},
{q:"أكمل السلسلة: 1، 1، 2، 3، 5، 8، ...",a:["11","12","13","15"],c:2,e:"كل عدد يساوي مجموع العددين السابقين؛ التالي 13."},
{q:"إذا كان أمس هو اليوم الذي يسبق الخميس بيومين، فما اليوم؟",a:["الثلاثاء","الأربعاء","الخميس","الجمعة"],c:2,e:"اليوم الذي يسبق الخميس بيومين هو الثلاثاء؛ إذا كان أمس الثلاثاء فاليوم الأربعاء. هذا السؤال يحتاج تصحيحًا.",fix:true},
{q:"لديك حبلان، يحترق كل واحد منهما بالكامل في ساعة لكن بسرعة غير منتظمة. كيف تقيس 45 دقيقة؟",a:["إشعال الأول من الطرفين والثاني من طرف","إشعال الحبلين من طرف واحد","إشعال الأول من طرف والثاني من الطرفين","لا يمكن"],c:0,e:"الأول ينتهي في 30 دقيقة. عندها أشعل الطرف الآخر من الحبل الثاني؛ ينتهي خلال 15 دقيقة إضافية."}
],
[
{q:"ما الرمز الكيميائي للأكسجين؟",a:["Ox","O","Og","C"],c:1,e:"الرمز الكيميائي للأكسجين هو O."},
{q:"ما الكوكب المعروف بالكوكب الأحمر؟",a:["الزهرة","المشتري","المريخ","زحل"],c:2,e:"يُعرف المريخ بالكوكب الأحمر بسبب أكاسيد الحديد على سطحه."},
{q:"ما العضو الذي يضخ الدم في جسم الإنسان؟",a:["الرئة","القلب","الكبد","الكلى"],c:1,e:"القلب يضخ الدم عبر الأوعية الدموية."},
{q:"ما وحدة قياس القوة في النظام الدولي؟",a:["الجول","الواط","النيوتن","الأمبير"],c:2,e:"تقاس القوة بوحدة النيوتن."},
{q:"ما الغاز الأكثر وفرة في الغلاف الجوي للأرض؟",a:["الأكسجين","النيتروجين","ثاني أكسيد الكربون","الهيدروجين"],c:1,e:"النيتروجين يشكل نحو 78% من الغلاف الجوي."},
{q:"ما أصغر وحدة بنائية تحتفظ بخصائص العنصر الكيميائي؟",a:["الجزيء","الخلية","الذرة","النواة"],c:2,e:"الذرة هي أصغر وحدة من العنصر تحتفظ بخواصه الكيميائية."},
{q:"أي جزء من الخلية يحتوي غالبًا على المادة الوراثية؟",a:["الغشاء","النواة","السيتوبلازم","الجدار الخلوي"],c:1,e:"توجد معظم المادة الوراثية في نواة الخلية حقيقية النواة."},
{q:"ما العملية التي تصنع بها النباتات غذاءها باستخدام الضوء؟",a:["التنفس","التخمّر","البناء الضوئي","التبخر"],c:2,e:"البناء الضوئي يحول الطاقة الضوئية إلى طاقة كيميائية مخزنة."},
{q:"ما قيمة تسارع الجاذبية الأرضية قرب سطح الأرض تقريبًا؟",a:["2.8 م/ث²","9.8 م/ث²","18 م/ث²","98 م/ث²"],c:1,e:"تسارع الجاذبية قرب سطح الأرض يقارب 9.8 متر/ثانية مربعة."},
{q:"أي جسيم يحمل شحنة كهربائية سالبة؟",a:["البروتون","النيوترون","الإلكترون","الفوتون"],c:2,e:"الإلكترون يحمل شحنة سالبة."},
{q:"ما نوع الرابطة التي تنشأ غالبًا من مشاركة الذرات بالإلكترونات؟",a:["أيونية","تساهمية","فلزية فقط","هيدروجينية"],c:1,e:"الرابطة التساهمية تنتج من مشاركة أزواج من الإلكترونات بين الذرات."},
{q:"أي طبقة من الغلاف الجوي تحدث فيها معظم الظواهر الجوية؟",a:["الستراتوسفير","الميزوسفير","التروبوسفير","الثرموسفير"],c:2,e:"تحدث معظم الظواهر الجوية في طبقة التروبوسفير."},
{q:"ما سرعة الضوء في الفراغ تقريبًا؟",a:["30 ألف كم/ث","150 ألف كم/ث","300 ألف كم/ث","مليون كم/ث"],c:2,e:"سرعة الضوء في الفراغ تقارب 300 ألف كيلومتر في الثانية."},
{q:"ما اسم المجرة التي تقع فيها المجموعة الشمسية؟",a:["أندروميدا","درب التبانة","المثلث","سحابة ماجلان"],c:1,e:"تقع المجموعة الشمسية في مجرة درب التبانة."},
{q:"ما الجسيم المسؤول عن نقل القوة الكهرومغناطيسية في النموذج القياسي؟",a:["الغلوون","الفوتون","بوزون هيغز","النيوترينو"],c:1,e:"الفوتون هو حامل القوة الكهرومغناطيسية."}
]
];
// إصلاح سؤالين في مجموعة الذكاء لتكون إجاباتهما واضحة ودقيقة.
QUESTIONS[1][8]={q:"إذا كان مجموع عددين 18 والفرق بينهما 4، فما العدد الأكبر؟",a:["7","9","11","13"],c:2,e:"العددان 11 و7؛ مجموعهما 18 والفرق بينهما 4.",fix:true};
QUESTIONS[1][13]={q:"إذا كان أمس هو اليوم الذي يسبق الخميس بيومين، فما اليوم؟",a:["الثلاثاء","الأربعاء","الخميس","الجمعة"],c:1,e:"اليوم الذي يسبق الخميس بيومين هو الثلاثاء؛ إذا كان أمس الثلاثاء فاليوم الأربعاء."};

// بنك إضافي للأسئلة المتجددة: تُختار 15 من كل مستوى يوميًا بنفس الترتيب لجميع اللاعبين.
QUESTIONS[0].push(
{q:"ما أول ما نزل من القرآن الكريم؟",a:["الفاتحة","اقرأ باسم ربك","المدثر","الإخلاص"],c:1,e:"أول ما نزل صدر سورة العلق: اقرأ باسم ربك."},
{q:"كم عدد أركان الإيمان؟",a:["خمسة","ستة","سبعة","ثمانية"],c:1,e:"أركان الإيمان ستة."},
{q:"من النبي الذي كلمه الله تكليمًا؟",a:["إبراهيم","موسى","عيسى","يوسف"],c:1,e:"موسى عليه السلام كليم الله."},
{q:"ما اسم أم النبي محمد ﷺ؟",a:["خديجة","آمنة بنت وهب","حليمة السعدية","فاطمة"],c:1,e:"والدة النبي ﷺ هي آمنة بنت وهب."},
{q:"في أي مدينة وُلد النبي ﷺ؟",a:["المدينة","الطائف","مكة","القدس"],c:2,e:"وُلد النبي ﷺ في مكة المكرمة."},
{q:"ما السورة التي تعدل ثلث القرآن؟",a:["الفلق","الإخلاص","الكوثر","العصر"],c:1,e:"ورد في الحديث أن سورة الإخلاص تعدل ثلث القرآن."},
{q:"من هو النبي الذي بنى السفينة؟",a:["هود","نوح","صالح","شعيب"],c:1,e:"أمر الله نوحًا عليه السلام بصنع السفينة."},
{q:"ما اسم الليلة التي نزل فيها القرآن؟",a:["ليلة النصف","ليلة القدر","ليلة الإسراء","ليلة الجمعة"],c:1,e:"أنزل القرآن في ليلة القدر."},
{q:"كم ركعة في صلاة الفجر المفروضة؟",a:["ركعتان","ثلاث","أربع","خمس"],c:0,e:"صلاة الفجر ركعتان فرضًا."},
{q:"من الصحابي الذي لُقب بالفاروق؟",a:["أبو بكر","عمر بن الخطاب","عثمان","علي"],c:1,e:"عمر بن الخطاب رضي الله عنه لُقب بالفاروق."},
{q:"ما اسم والد النبي إبراهيم؟",a:["آزر","يعقوب","عمران","عبد الله"],c:0,e:"ورد اسم آزر في القرآن الكريم."},
{q:"ما السورة التي تسمى قلب القرآن في الحديث المشهور؟",a:["يس","الرحمن","الملك","مريم"],c:0,e:"اشتهر هذا الوصف لسورة يس، والحديث الوارد فيه ضعيف."}
);
QUESTIONS[1].push(
{q:"ما العدد الذي يكمل النمط 3، 6، 12، 24، ...؟",a:["30","36","48","54"],c:2,e:"يتضاعف العدد في كل خطوة؛ التالي 48."},
{q:"إذا كان 5 عمال ينجزون عملًا في 10 أيام، فكم يومًا يحتاج 10 عمال بالمعدل نفسه؟",a:["2","5","10","20"],c:1,e:"مضاعفة عدد العمال تنصف الزمن إلى 5 أيام."},
{q:"أي عدد أولي؟",a:["21","27","29","33"],c:2,e:"29 لا يقبل القسمة إلا على 1 ونفسه."},
{q:"إذا كان محيط مربع 36 سم، فما طول ضلعه؟",a:["6 سم","8 سم","9 سم","12 سم"],c:2,e:"طول الضلع يساوي المحيط ÷ 4 = 9 سم."},
{q:"كم زاوية قائمة في المستطيل؟",a:["اثنتان","ثلاث","أربع","خمس"],c:2,e:"للمستطيل أربع زوايا قائمة."},
{q:"ما ناتج 15% من 200؟",a:["15","20","30","40"],c:2,e:"0.15 × 200 = 30."},
{q:"إذا كانت كل الورود نباتات، وبعض النباتات خضراء، فهل يلزم أن كل الورود خضراء؟",a:["نعم دائمًا","لا يلزم","لا توجد ورود","كل النباتات ورود"],c:1,e:"المعلومة لا تثبت أن جميع الورود خضراء."},
{q:"ما العدد التالي: 1، 8، 27، 64، ...؟",a:["100","125","144","216"],c:1,e:"هذه مكعبات 1 و2 و3 و4؛ التالي 5³ = 125."},
{q:"إذا كان اليوم الاثنين، فما اليوم بعد 17 يومًا؟",a:["الثلاثاء","الأربعاء","الخميس","الجمعة"],c:2,e:"17 يومًا تساوي أسبوعين وثلاثة أيام؛ الاثنين + 3 = الخميس."},
{q:"كم ضلعًا للشكل السداسي؟",a:["خمسة","ستة","سبعة","ثمانية"],c:1,e:"السداسي له ستة أضلاع."},
{q:"ما ناتج 7 × 8؟",a:["54","56","58","64"],c:1,e:"7 × 8 = 56."},
{q:"إذا كان س = 4، فما قيمة 3س + 2؟",a:["10","12","14","16"],c:2,e:"3 × 4 + 2 = 14."}
);
QUESTIONS[2].push(
{q:"ما أقرب نجم إلى الأرض؟",a:["الشعرى","الشمس","النجم القطبي","سيريوس"],c:1,e:"الشمس أقرب نجم إلى الأرض."},
{q:"ما العضية المسؤولة عن إنتاج معظم طاقة الخلية؟",a:["النواة","الميتوكوندريا","الريبوسوم","جهاز غولجي"],c:1,e:"الميتوكوندريا تنتج معظم ATP في الخلايا حقيقية النواة."},
{q:"ما الصيغة الكيميائية للماء؟",a:["CO₂","O₂","H₂O","NaCl"],c:2,e:"يتكون الماء من ذرتي هيدروجين وذرة أكسجين."},
{q:"ما وحدة قياس شدة التيار الكهربائي؟",a:["الفولت","الأمبير","الأوم","الواط"],c:1,e:"تقاس شدة التيار بوحدة الأمبير."},
{q:"أي عضو ينقي الدم من الفضلات ويكوّن البول؟",a:["القلب","الكليتان","المعدة","الرئتان"],c:1,e:"تقوم الكليتان بترشيح الدم وتكوين البول."},
{q:"ما الكوكب الأكبر في المجموعة الشمسية؟",a:["الأرض","زحل","المشتري","نبتون"],c:2,e:"المشتري أكبر كواكب المجموعة الشمسية."},
{q:"ما الغاز الذي تمتصه النباتات في البناء الضوئي؟",a:["الأكسجين","النيتروجين","ثاني أكسيد الكربون","الهيدروجين"],c:2,e:"تمتص النباتات ثاني أكسيد الكربون وتستخدمه في البناء الضوئي."},
{q:"ما درجة غليان الماء عند الضغط الجوي القياسي؟",a:["0°م","50°م","100°م","150°م"],c:2,e:"يغلي الماء عند 100 درجة مئوية عند ضغط جوي قياسي."},
{q:"أي معدن يكون سائلًا قرب درجة حرارة الغرفة؟",a:["الحديد","النحاس","الزئبق","الألمنيوم"],c:2,e:"الزئبق معدن سائل قرب درجة حرارة الغرفة."},
{q:"ما الجزء الذي يحمل المعلومات الوراثية؟",a:["DNA","النشا","الماء","الدهون"],c:0,e:"يحمل الحمض النووي DNA المعلومات الوراثية."},
{q:"ما اسم تحول السائل إلى غاز من سطحه؟",a:["التجمد","التكاثف","التبخر","الانصهار"],c:2,e:"التبخر تحول السائل إلى غاز من سطحه."},
{q:"أي فيتامين يساعد الجسم على امتصاص الكالسيوم؟",a:["فيتامين A","فيتامين B12","فيتامين C","فيتامين D"],c:3,e:"يساعد فيتامين D على امتصاص الكالسيوم."}
);

function seededDailyQuestions(level, date=today()) {
  const source = QUESTIONS[level].slice();
  let seed = 2166136261;
  const key = date + "-level-" + level;
  for (let i=0;i<key.length;i++) { seed ^= key.charCodeAt(i); seed = Math.imul(seed,16777619); }
  const random = () => { seed += 0x6D2B79F5; let t=seed; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
  for(let i=source.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[source[i],source[j]]=[source[j],source[i]];}
  return source.slice(0,15);
}
let ACTIVE_QUESTIONS = [0,1,2].map(i=>seededDailyQuestions(i));

const STORE=[
{id:"hint",name:"تلميح ذهبي",desc:"يعرض تلميحًا لسؤال أثناء اللعب.",price:3,icon:"💡",rarity:"common",label:"عادي"},
{id:"remove",name:"حذف خيار",desc:"يساعدك على استبعاد خيارين خاطئين.",price:5,icon:"✂️",rarity:"rare",label:"نادر"},
{id:"extra",name:"فرصة إضافية",desc:"عنصر مساعد للمحاولة في تحدٍ لاحق.",price:8,icon:"🛡️",rarity:"epic",label:"ملحمي"},
{id:"frame",name:"إطار ذهبي",desc:"إطار ذهبي مضيء يظهر حول صورتك في الملف الشخصي.",price:12,icon:"🖼️",rarity:"epic",label:"ملحمي"},
{id:"goldbadge",name:"وسام ذهبي",desc:"وسام ذهبي يظهر بجانب اسمك في ملفك الشخصي.",price:14,icon:"🏅",rarity:"epic",label:"ملحمي"},
{id:"aura",name:"هالة أسطورية",desc:"تأثير ذهبي خاص حول صورتك في الملف الشخصي.",price:15,icon:"✨",rarity:"legendary",label:"أسطوري"}
];
const ACHIEVEMENTS=[
{id:"first",name:"البداية",desc:"أجب عن أول سؤال إجابة صحيحة.",icon:"🌱",test:s=>s.correct>=1},
{id:"level",name:"خطوة أولى",desc:"أكمل المستوى الأول.",icon:"📘",test:s=>s.levelScores[0]!==null},
{id:"brain",name:"عقل متقد",desc:"أكمل مستوى تحدي الذكاء.",icon:"🧠",test:s=>s.levelScores[1]!==null},
{id:"science",name:"باحث صغير",desc:"أكمل مستوى العلوم.",icon:"⚛️",test:s=>s.levelScores[2]!==null},
{id:"streak5",name:"تركيز مذهل",desc:"حقق خمس إجابات صحيحة متتالية.",icon:"🔥",test:s=>s.bestStreak>=5},
{id:"legend",name:"أسطوري",desc:"اجمع 45 نقطة من الأسئلة.",icon:"👑",test:s=>s.totalPoints>=45},
{id:"collector",name:"جامع الجوائز",desc:"اشترِ عنصرًا من المتجر.",icon:"💎",test:s=>s.purchases.length>0},
{id:"all",name:"إكمال الرحلة",desc:"أكمل المستويات الثلاثة.",icon:"🏆",test:s=>s.levelScores.every(x=>x!==null)}
];
const DAILY=[
{id:"correct5",name:"بداية موفقة",desc:"أجب عن 5 أسئلة إجابة صحيحة.",goal:5,reward:3,icon:"🎯"},
{id:"play1",name:"خطوة جديدة",desc:"أجب عن 10 أسئلة.",goal:10,reward:4,icon:"📚"},
{id:"streak3",name:"سلسلة التركيز",desc:"حقق 3 إجابات صحيحة متتالية.",goal:3,reward:3,icon:"🔥"}
];
let state=null,currentLevel=0,currentIndex=0,streak=0,selected=false,usedHelp=false,questionOrder=[];
const SAVE_KEY="islamicChallengeSaveV1";
function seasonKey(date=today()){return date.slice(0,7);}
function freshState(name){return {name,totalPoints:0,seasonPoints:0,seasonKey:seasonKey(),seasonHistory:[],coins:0,correct:0,answered:0,bestStreak:0,levelScores:[null,null,null],levelProgress:[0,0,0],levelRunCorrect:[0,0,0],earnedQuestions:[],unlocked:0,purchases:[],claimedTasks:[],dailyDate:today(),dailyProgress:{correct5:0,play1:0,streak3:0},achievements:[],lastLevel:-1};}
function today(){const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Baghdad",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());const v={};parts.forEach(p=>v[p.type]=p.value);return `${v.year}-${v.month}-${v.day}`;}
function save(){if(state){localStorage.setItem(SAVE_KEY,JSON.stringify(state));if(window.onlineSyncState)window.onlineSyncState(state);}}
function load(){try{return JSON.parse(localStorage.getItem(SAVE_KEY)||"null")}catch(e){return null}}
function startGuest(){const name=document.getElementById("playerName").value.trim();if(!name){notify("اكتب اسم اللاعب","يرجى إدخال اسم قبل البدء.","✍️");return}state=freshState(name);save();enterGame();}
function resumeGame(){state=load();if(!state)return;refreshDaily();enterGame();}
function enterGame(){document.getElementById("bottomNav").classList.remove("hidden");renderHome();showPage("home");}
function accountNotice(){notify("الحساب الشخصي قيد الإعداد","هذه النسخة تحفظ تقدم الضيف على الجهاز نفسه. تسجيل الحساب والمزامنة بين الأجهزة يحتاجان ربط قاعدة بيانات في المرحلة التالية.","🔐")}
function showPage(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));const el=document.getElementById(page+"Page");if(el)el.classList.add("active");document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===page));if(page==="home")renderHome();if(page==="shop")renderShop();if(page==="tasks")renderTasks();if(page==="profile")renderProfile();if(page==="achievements")renderAchievements();if(page==="leaderboard"&&window.loadLeaderboard)window.loadLeaderboard();if(page==="friends"&&window.loadFriends)window.loadFriends();if(page==="chat"&&window.openGroupChat)window.openGroupChat();window.scrollTo({top:0,behavior:"smooth"});}
function refreshDaily(){const t=today();if(!state.dailyDate)state.dailyDate=t;if(state.dailyDate!==t){state.dailyDate=t;state.dailyProgress={correct5:0,play1:0,streak3:0};state.claimedTasks=[];state.levelProgress=[0,0,0];state.levelRunCorrect=[0,0,0];state.levelScores=[null,null,null];ACTIVE_QUESTIONS=[0,1,2].map(i=>seededDailyQuestions(i,t));save();}const sk=seasonKey(t);if(state.seasonKey!==sk){state.seasonHistory=state.seasonHistory||[];if(state.seasonKey)state.seasonHistory.push({key:state.seasonKey,points:state.seasonPoints||0});state.seasonHistory=state.seasonHistory.slice(-24);state.seasonKey=sk;state.seasonPoints=0;save();}}
function renderHome(){if(!state)return;refreshDaily();document.getElementById("homeName").textContent=state.name;document.getElementById("totalPoints").textContent=state.totalPoints;document.getElementById("coinBalance").textContent=state.coins;document.getElementById("coinCount").textContent=state.coins;document.getElementById("achievementCount").textContent=state.achievements.length;for(let i=0;i<3;i++){let score=state.levelScores[i],progress=score===null?state.levelProgress[i]:15;document.getElementById("progress"+i).style.width=(progress/15*100)+"%";let btn=document.getElementById("level"+(i+1)+"Btn"),status=document.getElementById("level"+(i+1)+"Status");if(i<=state.unlocked){btn.disabled=false;btn.textContent=score===null&&progress>0?"متابعة ←":score!==null?"إعادة اللعب":"ابدأ ←";status.textContent=score!==null?`مكتمل • ${score}/15`:progress>0?`السؤال ${progress+1}/15`:"متاح"}else{btn.disabled=true;btn.textContent="مقفل";status.textContent="مقفل"}}}
function openLevel(level){if(level>state.unlocked){notify("هذا المستوى مقفل","أكمل المستوى السابق بنتيجة 12/15 على الأقل لفتحه.","🔒");return}if(state.levelScores[level]!==null){notify("أكملت هذا المستوى بالفعل",`نتيجتك السابقة: ${state.levelScores[level]}/15.`,"🏅");return}currentLevel=level;if(state.levelProgress[level]>=15){state.levelProgress[level]=0;state.levelRunCorrect[level]=0;}currentIndex=state.levelProgress[level];streak=0;showPage("quiz");renderQuestion();}
function renderQuestion(){selected=false;usedHelp=false;const q=ACTIVE_QUESTIONS[currentLevel][currentIndex];document.getElementById("quizLevelName").textContent=["الثقافة الإسلامية","تحدي الذكاء","العلوم والمعرفة"][currentLevel];document.getElementById("difficultyLabel").textContent=currentIndex<5?"سهل":currentIndex<10?"متوسط":"صعب";document.getElementById("questionCounter").textContent=`السؤال ${currentIndex+1} / 15`;document.getElementById("questionNumber").textContent=`السؤال ${String(currentIndex+1).padStart(2,"0")}`;document.getElementById("questionText").textContent=q.q;document.getElementById("quizProgress").style.width=((currentIndex)/15*100)+"%";document.getElementById("quizCoins").textContent=state.coins;document.getElementById("streakCount").textContent=streak;document.getElementById("feedback").className="feedback hidden";document.getElementById("nextBtn").classList.add("hidden");const box=document.getElementById("answers");box.innerHTML="";q.a.forEach((a,i)=>{const b=document.createElement("button");b.className="answer-btn";b.textContent=`${["أ","ب","ج","د"][i]} — ${a}`;b.onclick=()=>answer(i);box.appendChild(b)});}
function answer(index){if(selected)return;selected=true;const q=ACTIVE_QUESTIONS[currentLevel][currentIndex],buttons=[...document.querySelectorAll(".answer-btn")],good=index===q.c;buttons.forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");if(i===index&&!good)b.classList.add("wrong")});state.answered++;state.dailyProgress.play1++;if(good){const earnedKey=`${state.dailyDate}-${currentLevel}-${currentIndex}`;state.dailyProgress.correct5++;if(!state.earnedQuestions.includes(earnedKey)){state.earnedQuestions.push(earnedKey);state.correct++;state.totalPoints++;state.seasonPoints=(state.seasonPoints||0)+1;state.coins++;}streak++;state.bestStreak=Math.max(state.bestStreak,streak);if(streak>=3)state.dailyProgress.streak3=Math.max(state.dailyProgress.streak3,streak);document.getElementById("feedback").className="feedback good";document.getElementById("feedback").textContent="إجابة صحيحة! +1 نقطة وعملة. "+q.e}else{streak=0;document.getElementById("feedback").className="feedback bad";document.getElementById("feedback").textContent="إجابة غير صحيحة. "+q.e}document.getElementById("streakCount").textContent=streak;document.getElementById("quizCoins").textContent=state.coins;document.getElementById("nextBtn").textContent=currentIndex===14?"عرض النتيجة ←":"السؤال التالي ←";document.getElementById("nextBtn").classList.remove("hidden");checkAchievements();save();}
function nextQuestion(){if(currentIndex===14){finishLevel();return}currentIndex++;state.levelProgress[currentLevel]=currentIndex;save();renderQuestion();}
function finishLevel(){const score=0; // score computed from correct answers recorded for this run
const runScore=state.levelRunCorrect[currentLevel];state.levelScores[currentLevel]=runScore>=12?runScore:null;state.levelProgress[currentLevel]=15;if(runScore>=12&&currentLevel<2)state.unlocked=Math.max(state.unlocked,currentLevel+1);state.lastLevel=currentLevel;state.coins+=5;checkAchievements();save();document.getElementById("finalScore").textContent=runScore;document.getElementById("resultTitle").textContent=runScore>=12?"إنجاز رائع!":"أحسنت المحاولة!";document.getElementById("resultSubtitle").textContent=`نتيجتك في ${["الثقافة الإسلامية","تحدي الذكاء","العلوم والمعرفة"][currentLevel]}`;document.getElementById("unlockMessage").textContent=runScore>=12?(currentLevel<2?"لقد فتحت المستوى التالي!":"لقد أكملت جميع المستويات!"): "تحتاج إلى 12 نقطة على الأقل لفتح المستوى التالي. يمكنك إعادة المحاولة.";document.getElementById("chestReward").classList.remove("hidden");document.getElementById("chestReward").textContent="🎁 حصلت على صندوق مستوى + 5 عملات!";showPage("result");if(state.totalPoints>=45&&!state.legendaryShown){state.legendaryShown=true;save();setTimeout(()=>flash("LEGENDARY!","حصلت على الوسام الأسطوري بعد جمع 45 نقطة."),700)}}
const oldAnswer=answer;
answer=function(index){if(selected)return;const q=ACTIVE_QUESTIONS[currentLevel][currentIndex];if(index===q.c)state.levelRunCorrect[currentLevel]++;oldAnswer(index);state.levelProgress[currentLevel]=currentIndex+1;save();};
function renderShop(){document.getElementById("shopCoins").textContent=state.coins;document.getElementById("shopItems").innerHTML=STORE.map(x=>{let owned=state.purchases.includes(x.id);return `<article class="shop-item panel"><div class="item-art">${x.icon}</div><span class="rarity ${x.rarity}">${x.label}</span><h3>${x.name}</h3><p class="muted">${x.desc}</p><div class="buy-row"><span class="wallet">◆ ${x.price}</span><button class="buy-btn" ${owned||state.coins<x.price?"disabled":""} onclick="buyItem('${x.id}')">${owned?"تم الشراء":state.coins<x.price?"رصيد غير كافٍ":"شراء"}</button></div></article>`}).join("")}
function buyItem(id){
 const item=STORE.find(x=>x.id===id);
 if(!item||state.purchases.includes(id))return;
 if(state.coins<item.price){notify("رصيد غير كافٍ","أجب عن المزيد من الأسئلة لجمع العملات.","🪙");return}
 state.coins-=item.price;
 state.purchases.push(id);
 // عناصر الملف الشخصي تُفعّل فور شرائها وتبقى محفوظة.
 if(id==="frame")state.equippedFrame=true;
 if(id==="goldbadge")state.equippedGoldBadge=true;
 if(id==="aura")state.equippedAura=true;
 checkAchievements();save();renderShop();renderHome();renderProfile();
 flash(item.rarity==="legendary"?"LEGENDARY PURCHASE!":"PURCHASE SUCCESS",`تم شراء ${item.name} وتفعيله في ملفك الشخصي!`);
}
function renderTasks(){refreshDaily();document.getElementById("taskDate").textContent=state.dailyDate;document.getElementById("taskList").innerHTML=DAILY.map(t=>{let p=Math.min(state.dailyProgress[t.id]||0,t.goal),claimed=state.claimedTasks.includes(t.id),done=p>=t.goal;return `<article class="task-item panel"><div class="task-icon">${t.icon}</div><div class="task-info"><b>${t.name}</b><small>${t.desc} • ${p}/${t.goal}</small><div class="progress" style="margin-top:8px"><i style="width:${p/t.goal*100}%"></i></div></div><button class="claim-btn" ${!done||claimed?"disabled":""} onclick="claimTask('${t.id}')">${claimed?"تم الاستلام":`+${t.reward} ◆`}</button></article>`}).join("")}
function claimTask(id){const t=DAILY.find(x=>x.id===id);if(!t||state.claimedTasks.includes(id)||state.dailyProgress[id]<t.goal)return;state.claimedTasks.push(id);state.coins+=t.reward;save();renderTasks();renderHome();notify("مكافأة المهمة","أضيفت "+t.reward+" عملات إلى رصيدك.","🎁")}
function renderProfile(){
 document.getElementById("profileName").textContent=state.name;const editName=document.getElementById("editPlayerName");if(editName && document.activeElement!==editName)editName.value=state.name;
 document.getElementById("profilePoints").textContent=state.totalPoints;
 document.getElementById("profileCorrect").textContent=state.correct;
 document.getElementById("profileStreak").textContent=state.bestStreak;
 document.getElementById("profileRank").textContent=state.totalPoints>=45?"أسطوري":state.totalPoints>=30?"فضي":state.totalPoints>=15?"برونزي":"مبتدئ";
 const avatar=document.getElementById("profileAvatar");
 avatar.classList.toggle("has-gold-frame",state.purchases.includes("frame"));
 avatar.classList.toggle("has-aura",state.purchases.includes("aura"));
 avatar.textContent=state.purchases.includes("aura")?"✧":"✦";
 const equipped=[];
 if(state.purchases.includes("frame"))equipped.push("🖼️ الإطار الذهبي");
 if(state.purchases.includes("goldbadge"))equipped.push("🏅 الوسام الذهبي");
 if(state.purchases.includes("aura"))equipped.push("✨ الهالة الأسطورية");
 document.getElementById("profileEquipped").innerHTML=equipped.length?equipped.map(x=>`<span class="equipped-chip">${x}</span>`).join(""): '<small class="muted">لا توجد عناصر تجميلية مفعّلة بعد</small>';
 document.getElementById("profileLevels").innerHTML=["الثقافة الإسلامية","تحدي الذكاء","العلوم والمعرفة"].map((n,i)=>`<div class="profile-level-row"><span>${n}</span><b>${state.levelScores[i]===null?"غير مكتمل":state.levelScores[i]+"/15"}</b></div>`).join("");
 document.getElementById("badgeList").innerHTML=[{n:"برونزي",v:15,ic:"🥉"},{n:"فضي",v:30,ic:"🥈"},{n:"أسطوري",v:45,ic:"👑"}].map(b=>`<div class="badge-card ${state.totalPoints>=b.v?"":"locked"}"><div class="badge-icon">${b.ic}</div><b>${b.n}</b><small>${b.v} نقطة</small></div>`).join("");
 const owned=STORE.filter(item=>state.purchases.includes(item.id));
 document.getElementById("inventoryList").innerHTML=owned.length?owned.map(item=>`<div class="inventory-row"><span class="inventory-icon">${item.icon}</span><div><b>${item.name}</b><small>${item.label} • مفعّل في الملف الشخصي</small></div><span class="owned-check">✓</span></div>`).join(""):`<p class="muted inventory-empty">لم تشترِ أي عناصر بعد. زر المتجر لاكتساب إطارات وأوسمة وتأثيرات.</p>`;
}
function renderAchievements(){document.getElementById("achievementList").innerHTML=ACHIEVEMENTS.map(a=>{let got=state.achievements.includes(a.id);return `<article class="achievement-item panel"><div class="achievement-icon">${a.icon}</div><div class="achievement-info"><b>${a.name}</b><small>${a.desc}</small></div><span class="pill">${got?"مكتمل":"مقفل"}</span></article>`}).join("")}
function checkAchievements(){for(const a of ACHIEVEMENTS){if(!state.achievements.includes(a.id)&&a.test(state)){state.achievements.push(a.id);setTimeout(()=>notify("إنجاز جديد!",`فتحت إنجاز: ${a.name}`,a.icon),250)}}}
function confirmExit(){if(confirm("هل تريد الخروج؟ سيتم حفظ تقدمك.")){state.levelProgress[currentLevel]=Math.max(state.levelProgress[currentLevel],currentIndex);save();showPage("home")}}
function resetProgress(){if(confirm("هل أنت متأكد؟ سيتم حذف جميع نقاطك وإنجازاتك وتقدمك من هذا الجهاز.")){localStorage.removeItem(SAVE_KEY);state=null;document.getElementById("bottomNav").classList.add("hidden");document.getElementById("resumeBtn").classList.add("hidden");showLogin()}}
function showLogin(){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById("loginPage").classList.add("active");}
function notify(title,text,icon="✨"){document.getElementById("modalTitle").textContent=title;document.getElementById("modalText").textContent=text;document.getElementById("modalIcon").textContent=icon;document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function flash(title,text){document.getElementById("flashTitle").textContent=title;document.getElementById("flashText").textContent=text;const f=document.getElementById("legendaryFlash");f.classList.remove("hidden");setTimeout(()=>f.classList.add("hidden"),3000)}
window.addEventListener("load",()=>{const saved=load();if(saved){document.getElementById("playerName").value=saved.name;document.getElementById("resumeBtn").classList.remove("hidden")}});

// جسر آمن بين منطق اللعبة وملف الاتصال السحابي.
window.gameBridge={getState:()=>state,setState:(next)=>{state=next;save();enterGame();},freshState:(name)=>freshState(name),save:()=>save(),enterGame:()=>enterGame(),getSaveKey:()=>SAVE_KEY};

// ===== تحديث تخصيص الشخصية 1.1 =====
STORE.push(
  {id:"avatarowl",name:"شخصية البومة الحكيمة",desc:"صورة رمزية للبومة",price:10,icon:"🦉",rarity:"rare",label:"نادر"},
  {id:"avatarfox",name:"شخصية الثعلب الذكي",desc:"صورة رمزية للثعلب",price:12,icon:"🦊",rarity:"epic",label:"ملحمي"},
  {id:"titlethinker",name:"لقب المفكر",desc:"لقب خاص يظهر في ملفك",price:8,icon:"🧠",rarity:"rare",label:"نادر"},
  {id:"titlelegend",name:"لقب صانع المعرفة",desc:"لقب مميز ونادر",price:20,icon:"📚",rarity:"legendary",label:"أسطوري"}
);

function equipItem(id) {
  if (!state || !state.purchases.includes(id)) {
    notify("العنصر غير مملوك", "اشترِ العنصر أولًا من المتجر.");
    return;
  }
  if (id === "avatarowl" || id === "avatarfox") state.equippedAvatar = id;
  if (id === "titlethinker" || id === "titlelegend") state.equippedTitle = id;
  save();
  renderProfile();
  notify("تم التجهيز", "تم تحديث ملفك الشخصي بنجاح.", "✨");
}

const renderProfileBeforeCustomization = renderProfile;
renderProfile = function () {
  if (!state) return;
  renderProfileBeforeCustomization();

  const avatar = document.getElementById("profileAvatar");
  if (avatar) {
    avatar.textContent = state.equippedAvatar === "avatarowl" ? "🦉" :
      state.equippedAvatar === "avatarfox" ? "🦊" :
      state.purchases.includes("aura") ? "✧" : "✦";
  }

  const equippedBox = document.getElementById("profileEquipped");
  if (equippedBox) {
    let titleBox = document.getElementById("equippedTitleLabel");
    if (!titleBox) {
      titleBox = document.createElement("div");
      titleBox.id = "equippedTitleLabel";
      titleBox.className = "equipped-items";
      equippedBox.insertAdjacentElement("afterend", titleBox);
    }
    titleBox.textContent = state.equippedTitle === "titlethinker" ? "🧠 المفكر" :
      state.equippedTitle === "titlelegend" ? "📚 صانع المعرفة" : "";
  }

  const hero = document.querySelector("#profilePage .profile-hero");
  if (!hero) return;
  let box = document.getElementById("customizeList");
  if (!box) {
    box = document.createElement("div");
    box.id = "customizeList";
    box.className = "panel";
    box.style.cssText = "padding:20px;margin:25px 0";
    hero.insertAdjacentElement("afterend", box);
  }

  const items = STORE.filter(item =>
    ["avatarowl", "avatarfox", "titlethinker", "titlelegend"].includes(item.id)
  );
  box.innerHTML = `<h2>🎨 تخصيص الشخصية</h2>
    <p class="muted">اختر شخصيتك ولقبك المفضل</p>
    ${items.map(item => {
      const owned = state.purchases.includes(item.id);
      const equipped = state.equippedAvatar === item.id || state.equippedTitle === item.id;
      return `<div style="padding:12px;margin:10px 0;border:1px solid #34445f;border-radius:12px">
        <div style="font-size:24px">${item.icon}</div>
        <b>${item.name}</b>
        <p class="muted">${item.label} • ${item.price} عملات</p>
        ${owned
          ? `<button class="small-btn" onclick="equipItem('${item.id}')">${equipped ? "مجهز ✓" : "تجهيز"}</button>`
          : `<span class="muted">اشترِ العنصر من المتجر</span>`}
      </div>`;
    }).join("")}`;
};

console.log("Islamic Challenge Update 1.1 Loaded");


// ===== ISLAMIC CHALLENGE 3.0: متجر تخصيص الملف الشخصي =====
STORE.push(
  {id:"avatarfalcon",name:"شخصية الصقر",desc:"رمز الصقر يظهر في ملفك الشخصي.",price:16,icon:"🦅",rarity:"epic",label:"ملحمي",kind:"avatar"},
  {id:"avatarlion",name:"شخصية الأسد",desc:"رمز الأسد للاعبين أصحاب العزيمة.",price:20,icon:"🦁",rarity:"legendary",label:"أسطوري",kind:"avatar"},
  {id:"avatarrobot",name:"شخصية الروبوت",desc:"رمز تقني مميز لملفك.",price:14,icon:"🤖",rarity:"rare",label:"نادر",kind:"avatar"},
  {id:"frameblue",name:"إطار المحيط الأزرق",desc:"إطار أزرق متوهج حول صورتك.",price:13,icon:"🔷",rarity:"rare",label:"نادر",kind:"frame"},
  {id:"framepurple",name:"إطار المجرة",desc:"إطار بنفسجي بتأثير فضائي.",price:18,icon:"💜",rarity:"epic",label:"ملحمي",kind:"frame"},
  {id:"framelegend",name:"إطار العرش الأسطوري",desc:"إطار ذهبي ملكي نادر.",price:30,icon:"👑",rarity:"legendary",label:"أسطوري",kind:"frame"},
  {id:"titlestrategist",name:"لقب الاستراتيجي",desc:"لقب يظهر أسفل اسمك.",price:12,icon:"♟️",rarity:"rare",label:"نادر",kind:"title"},
  {id:"titlegenius",name:"لقب العبقري",desc:"لقب مميز يظهر في ملفك.",price:22,icon:"🧠",rarity:"epic",label:"ملحمي",kind:"title"},
  {id:"titlemaster",name:"لقب سيد المعرفة",desc:"لقب أسطوري لهواة المعرفة.",price:35,icon:"📜",rarity:"legendary",label:"أسطوري",kind:"title"}
);

const PROFILE_COSMETICS = [
  ...STORE.filter(x=>["avatarowl","avatarfox","titlethinker","titlelegend","frame","goldbadge","aura"].includes(x.id)),
  ...STORE.filter(x=>["avatarfalcon","avatarlion","avatarrobot","frameblue","framepurple","framelegend","titlestrategist","titlegenius","titlemaster"].includes(x.id))
];
const PROFILE_AVATARS = {avatarowl:"🦉",avatarfox:"🦊",avatarfalcon:"🦅",avatarlion:"🦁",avatarrobot:"🤖"};
const PROFILE_TITLES = {titlethinker:"🧠 المفكر",titlelegend:"📚 صانع المعرفة",titlestrategist:"♟️ الاستراتيجي",titlegenius:"🧠 العبقري",titlemaster:"📜 سيد المعرفة"};
const PROFILE_FRAMES = {frame:"gold",frameblue:"blue",framepurple:"purple",framelegend:"legend"};

function equipItem(id){
  if(!state || !state.purchases.includes(id)){notify("العنصر غير مملوك","اشترِ العنصر أولًا من المتجر.");return;}
  if(PROFILE_AVATARS[id]) state.equippedAvatar=id;
  else if(PROFILE_TITLES[id]) state.equippedTitle=id;
  else if(PROFILE_FRAMES[id]) state.equippedFrameId=id;
  else if(id==="aura") state.equippedAura=true;
  else if(id==="goldbadge") state.equippedGoldBadge=true;
  save();renderProfile();notify("تم التجهيز","تم تحديث مظهر ملفك الشخصي.","✨");
}
const buyItemBeforeProfileCosmetics = buyItem;
buyItem = function(id){
  const had=!!(state && state.purchases.includes(id));
  buyItemBeforeProfileCosmetics(id);
  if(!had && state && state.purchases.includes(id) && (PROFILE_AVATARS[id]||PROFILE_TITLES[id]||PROFILE_FRAMES[id])){
    if(PROFILE_AVATARS[id])state.equippedAvatar=id;
    if(PROFILE_TITLES[id])state.equippedTitle=id;
    if(PROFILE_FRAMES[id])state.equippedFrameId=id;
    save();renderProfile();
  }
};
const renderProfileBeforeV3Cosmetics = renderProfile;
renderProfile = function(){
  if(!state)return;
  renderProfileBeforeV3Cosmetics();
  const avatar=document.getElementById("profileAvatar");
  if(avatar){
    avatar.textContent=PROFILE_AVATARS[state.equippedAvatar] || (state.purchases.includes("aura")?"✧":"✦");
    avatar.classList.remove("frame-gold-v3","frame-blue-v3","frame-purple-v3","frame-legend-v3");
    const frame=PROFILE_FRAMES[state.equippedFrameId] || (state.equippedFrame?"gold":null);
    if(frame)avatar.classList.add("frame-"+frame+"-v3");
    avatar.classList.toggle("has-aura",!!state.equippedAura || state.purchases.includes("aura"));
  }
  const title=document.getElementById("equippedTitleLabel");
  if(title)title.textContent=PROFILE_TITLES[state.equippedTitle]||"";
  const box=document.getElementById("customizeList");
  if(!box)return;
  const groups=[
    ["🧑‍🚀 الصور الرمزية",PROFILE_COSMETICS.filter(x=>PROFILE_AVATARS[x.id])],
    ["🖼️ الإطارات",PROFILE_COSMETICS.filter(x=>PROFILE_FRAMES[x.id])],
    ["🏷️ الألقاب",PROFILE_COSMETICS.filter(x=>PROFILE_TITLES[x.id])],
    ["✨ التأثيرات والأوسمة",PROFILE_COSMETICS.filter(x=>["aura","goldbadge"].includes(x.id))]
  ];
  box.innerHTML=`<div class="customize-head"><div><h2>🎨 تخصيص شخصيتك</h2><p class="muted">اشترِ بالعملات، ثم جهّز العناصر التي تملكها.</p></div><span class="wallet">◆ ${state.coins}</span></div>`+
    groups.map(([heading,items])=>`<section class="cosmetic-group"><h3>${heading}</h3><div class="cosmetic-grid">${items.map(item=>{
      const owned=state.purchases.includes(item.id);
      const equipped=(PROFILE_AVATARS[item.id]&&state.equippedAvatar===item.id)||(PROFILE_TITLES[item.id]&&state.equippedTitle===item.id)||(PROFILE_FRAMES[item.id]&&state.equippedFrameId===item.id)||(item.id==="aura"&&state.equippedAura)||(item.id==="goldbadge"&&state.equippedGoldBadge);
      const action=owned?`<button class="small-btn" onclick="equipItem('${item.id}')">${equipped?"مجهز ✓":"تجهيز"}</button>`:`<button class="small-btn cosmetic-buy" onclick="buyItem('${item.id}')" ${state.coins<item.price?"disabled":""}>شراء • ${item.price} ◆</button>`;
      return `<article class="cosmetic-card"><div class="cosmetic-icon">${item.icon}</div><div class="cosmetic-info"><b>${item.name}</b><small>${item.label} • ${item.price} عملة</small></div>${action}</article>`;
    }).join("")}</div></section>`).join("");
};
