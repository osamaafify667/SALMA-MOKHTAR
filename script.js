// Salma Mokhtar — interactions
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('hide'), 600);
});

// Mobile nav
function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
}
window.toggleNav = toggleNav;

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count || '0', 10);
    const dur = 1400, t0 = performance.now();
    function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US') + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

// Work filter (placeholder-ready)
function filterWork(cat, btn) {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.work-item').forEach(item => {
    const show = cat === 'all' || item.dataset.cat === cat;
    item.style.display = show ? '' : 'none';
  });
}
window.filterWork = filterWork;

// Contact form -> WhatsApp or Instagram
function copyText(t){
  if(navigator.clipboard && window.isSecureContext){ return navigator.clipboard.writeText(t).catch(()=>fallbackCopy(t)); }
  fallbackCopy(t);
}
function fallbackCopy(t){
  try{
    const ta = document.createElement('textarea');
    ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }catch(e){}
}
function sendOrder(e) {
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const service = f.service.value;
  const details = f.details.value.trim();
  const picked = f.querySelector('input[name="method"]:checked');
  const method = picked ? picked.value : 'whatsapp';
  const isEn = document.documentElement.lang === 'en';
  const raw = isEn
    ? `Hi Salma!\nName: ${name}\nService: ${service}\nDetails: ${details}`
    : `أهلاً سلمى 🌸\nأنا: ${name}\nالخدمة المطلوبة: ${service}\nالتفاصيل: ${details}`;
  if(method === 'instagram'){
    copyText(raw);
    window.open('https://www.instagram.com/salma.mohtar/', '_blank');
    document.getElementById('formMsg').textContent = isEn ? 'Message copied! Paste it in the Instagram DM ✅' : 'اتنسخت رسالتك! الصقيها في رسالة الانستجرام ✅';
  }else{
    const text = encodeURIComponent(raw);
    // غيّري الرقم لرقم سلمى الحقيقي
    const phone = '584169651648';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    document.getElementById('formMsg').textContent = isEn ? 'Your order is ready! Complete sending on WhatsApp ✅' : 'تم تجهيز طلبك! أكملي الإرسال على واتساب ✅';
  }
  return false;
}
window.sendOrder = sendOrder;

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Language toggle (AR ⇄ EN) =====
const I18N = {
"— إلا لو التصميم للطباعة فبيتسلم مجاناً.":"— unless the design is for print, then it's free.",
"— التزام كامل بالمواعيد.":"— full commitment to deadlines.",
"— والفلترة هتشتغل تلقائياً.":"— and filtering will work automatically.",
"& الأسعار":"& Pricing",
"(50% ديبوزت + 7 تعديلات مجانية)":"(50% deposit + 7 free revisions)",
"/ 4 سلايد":"/ 4 slides",
"/ باكدج":"/ package",
"/ باكدج كاملة":"/ full package",
"/ تصميم":"/ design",
"/ تصميم واحد":"/ single design",
"/ لوجو":"/ logo",
"، اشتغلت مع":", worked with",
"، وبعدها بدّلي بلوكات الـ":", then replace the",
"؟ 💜":"? 💜",
"+1300 عميل سعيد":"+1300 happy clients",
"+6 شركات":"+6 companies",
"✅ واتساب الموقع متوصل على رقم سلمى مباشرة":"✅ The website WhatsApp is connected to Salma's number directly",
"✨ تصميم لوجو — $30":"✨ Logo design — $30",
"1300 عميل":"1300 clients",
"3 سنوات":"3 years",
"450 عميل على Upwork و850 على Fiverr + شركات — فاهمة ذوق السوق العربي والأجنبي وبصمم للي يبيع.":"450 clients on Upwork and 850 on Fiverr + companies — I understand Arab and international taste and design what sells.",
"450+ عميل و 850+ عميل بتقييمات ممتازة":"450+ and 850+ clients with excellent reviews",
"48 ساعة من دفع الديبوزت":"48 hours from deposit payment",
"50% من التكلفة قبل البدء":"50% of the cost before starting",
"7 تعديلات مجانية":"7 free revisions",
"PNG و PDF":"PNG & PDF",
"ابعتي طلبك":"Send your request",
"إجمالي العملاء":"Total clients",
"احجزي مكانك — التسليم خلال 48 ساعة":"Book your spot — delivery within 48 hours",
"احجزي مكانك دلوقتي — التسليم خلال 48 ساعة من دفع الديبوزت":"Book your spot now — delivery within 48 hours of deposit",
"احفظ الصورة باسم":"Save the image as",
"اختاري التصنيف عشان تشوفي نوع الشغل اللي يهمك":"Choose a category to see the work you care about",
"اختاري الخدمة *":"Choose the service *",
"اختاري الخدمة واشرحي فكرتك":"Choose the service and explain your idea",
"ادفعي 50% ديبوزت":"Pay 50% deposit",
"إرسال الطلب على واتساب 🚀":"Send order via WhatsApp 🚀",
"ارفعي صورتك في assets/work-1.jpg":"Upload your image at assets/work-1.jpg",
"ارفعي صورتك في assets/work-2.jpg":"Upload your image at assets/work-2.jpg",
"ارفعي صورتك في assets/work-3.jpg":"Upload your image at assets/work-3.jpg",
"ارفعي صورتك في assets/work-4.jpg":"Upload your image at assets/work-4.jpg",
"ارفعي صورتك في assets/work-5.jpg":"Upload your image at assets/work-5.jpg",
"ارفعي صورتك في assets/work-6.jpg":"Upload your image at assets/work-6.jpg",
"أرقام حقيقية من منصات عالمية + مختارات من شغلي — والمعرض بيكبر كل أسبوع 💜":"Real numbers from global platforms + selections of my work — and the gallery grows every week 💜",
"استشارة سريعة مجانية قبل الطلب":"Quick free consultation before ordering",
"استلام التصميم خلال":"Design delivery within",
"استلام تصميمك خلال 48 ساعة من دفع الديبوزت، مع تواصل واضح طول فترة التنفيذ و7 تعديلات مجانية.":"Receive your design within 48 hours of deposit, with clear communication and 7 free revisions.",
"استلمي خلال 48 ساعة":"Receive within 48 hours",
"أسعار ثابتة وواضحة بالدولار — اختاري الخدمة المناسبة لبراندك واطلبيها في دقيقة.":"Fixed clear prices in USD — pick the right service for your brand in a minute.",
"أسعار واضحة من الأول — بدون مفاجآت.":"Clear prices from the start — no surprises.",
"اسمك الكريم *":"Your name *",
"اشرحي فكرتك *":"Explain your idea *",
"اطلبي بوست":"Order a post",
"اطلبي تصميمك ✨":"Order your design ✨",
"اطلبي تصميمك دلوقتي ✨":"Order your design now ✨",
"اطلبي كاروسيل":"Order a carousel",
"اطلبي كامبين":"Order a campaign",
"اطلبي لوجو":"Order a logo",
"اطلبي مطبوعات":"Order prints",
"اطلبيها دلوقتي":"Order it now",
"أعمالي":"My Work",
"اقريها كويس قبل الطلب عشان نشتغل براحة بال من أول يوم 🤝":"Read it well before ordering so we work with peace of mind 🤝",
"الـ 50% التانيين بعد التسليم":"The other 50% after delivery",
"الأكثر طلباً 🔥":"Most requested 🔥",
"التسليم خلال 48 ساعة":"Delivery within 48 hours",
"الخدمات":"Services",
"الخدمات والأسعار":"Services & Pricing",
"الرئيسية":"Home",
"العميل بيدفع":"The client pays",
"العميل بيستلم التصميم بصيغة":"The client receives the design in",
"الفاضية في ملف":"empty ones in the",
"الفورم بيجهز رسالتك وتتبعت على واتساب":"The form prepares your message for WhatsApp",
"الكل":"All",
"المعرض 🎨":"Gallery 🎨",
"الملف المفتوح (Source)":"The open (source) file",
"املِي الفورم وهيوصلك رد على واتساب مباشرة — وبنبدأ التنفيذ بعد الديبوزت بـ 48 ساعة تستلمي تصميمك 🚀":"Fill the form and get a reply on WhatsApp directly — we start after the deposit and you receive in 48h 🚀",
"أهلاً، أنا":"Hi, I'm",
"بأسماء":"with names",
"بالسطر ده:":"with this line:",
"بالضغط على إرسال أنتي موافقة على":"By sending you agree to",
"بجودة عالية.":"in high quality.",
"بريميوم":"Premium",
"بصيغة PNG + PDF + تعديلاتك":"in PNG + PDF with your revisions",
"بعد رضاكي الكامل عن التسليم":"After your full satisfaction",
"بوست / ستوري بمقاسات المنصة، كابشن-فريندلي، وألوان هويتك.":"Post / story in platform sizes, caption-friendly, in your brand colors.",
"بوستات توقف السكرول ومصممة لمنصتك ومقاساتها.":"Scroll-stopping posts designed for your platform and sizes.",
"بيكون في":"there is",
"تبدأ من / حسب الكامبين":"from / حسب الكامبين",
"تحذير مهم:":"Important warning:",
"تسليم PNG + PDF":"PNG + PDF delivery",
"تصاميم الطباعة بتتسلم بمقاسات وألوان طباعة مظبوطة (CMYK + Bleed).":"Print designs delivered in correct print sizes and colors (CMYK + Bleed).",
"تصميم المطبوعات":"Print design",
"تصميم بهدف":"Design with purpose",
"تصميم سوشيال ميديا":"Social media design",
"تصميم كاروسيل — 4 سلايد":"Carousel design — 4 slides",
"تصميم كامبين":"Campaign design",
"تصميم لوجو":"Logo design",
"تقييمات 5 نجوم على المنصات":"5-star reviews on platforms",
"تكلفة إضافية":"Extra cost",
"تواصلي":"Contact",
"تواصلي معي":"Contact Me",
"جاهزة تخلي براندك يبان":"Ready to make your brand look",
"جرافيك ديزاينر":"Graphic Designer",
"جرافيك ديزاينر — براندات بريميوم تهتم بالتفاصيل":"Graphic designer — premium brands with attention to detail",
"جرافيك ديزاينر بخبرة":"Graphic designer with",
"حطي صور التصاميم جوه فولدر":"Put the design images inside the folder",
"حول العالم على Upwork و Fiverr. أصمم هويات بصرية ولوجوهات وسوشيال ميديا تخلي براندك يبان":"worldwide on Upwork & Fiverr. I design identities, logos and social media that make your brand look",
"خبرة 3 سنين":"3 years experience",
"خبرة عالمية":"Global experience",
"خدماتي":"My Services",
"رد سريع طول اليوم":"Fast replies all day",
"سرعة + التزام":"Speed + commitment",
"سلسلة تصاميم متكاملة لحملة إعلانية واحدة بهوية موحدة ورسالة واضحة.":"A full set of designs for one ad campaign with one identity and message.",
"سلمى مختار":"Salma Mokhtar",
"سلمى مختار 💜":"Salma Mokhtar 💜",
"سنوات خبرة":"Years experience",
"سوشيال ميديا":"Social media",
"سياسة العمل":"Work policy",
"سياسة العمل 📋":"Work Policy 📋",
"شركات":"Companies",
"شركات اشتغلت معاها":"Companies I worked with",
"شوفي أعمالي ←":"See my work ←",
"شوفي أعمالي الأول":"See my work first",
"شوفي الأسعار":"See pricing",
"شوفي خدماتي وأسعاري 💜":"See my services & prices 💜",
"شوفي شغلي الأول":"See my work first",
"طريقة التواصل":"Contact method",
"عجبك الستايل؟ خلي تصميمك الجاي هنا ⭐":"Like the style? Make your next design here ⭐",
"على كل تصميم":"on every design",
"على كل تصميم — عشان نوصله لأحلى نسخة ترضيكي تماماً.":"on every design — to reach the version you love.",
"عميل Fiverr":"Fiverr clients",
"عميل Upwork":"Upwork clients",
"عميل على Fiverr":"Clients on Fiverr",
"عميل على Upwork":"Clients on Upwork",
"غير مسؤولة لو العميل طبع تصميم غير مخصص للطباعة — تصاميم السوشيال (RGB) غير صالحة للطباعة وجودتها هتختلف على الورق.":"Not responsible if the client prints a non-print design — social designs (RGB) are not print-ready.",
"فلاير، بروشور، بيزنس كارد، منيو، باكدجينج — جاهز للطباعة بجودة عالية.":"Flyers, brochures, business cards, menus, packaging — print-ready in high quality.",
"في التنفيذ، و":"in execution, and",
"كاروسيل انستجرام / لينكدإن يشد العين ويزود التفاعل والحفظ والمشاركة.":"Instagram / LinkedIn carousels that grab attention and boost engagement.",
"كل الخدمات والأسعار + سياسة العمل ←":"All services, prices + work policy ←",
"كل تصميم عندي ليه هدف: يوقف السكرول، يبني ثقة، ويحوّل المتابع لعميل.":"Every design has a goal: stop the scroll, build trust, turn followers into clients.",
"كلميني دلوقتي ←":"Talk to me now ←",
"كلميني واتساب مباشرة 💬":"Message me on WhatsApp 💬",
"كملي الـ 50%":"Complete the 50%",
"لاستلام":"To receive",
"لإضافة تصاميمك بعدين:":"To add your designs later:",
"لتأكيد الحجز وبدء التنفيذ":"To confirm booking and start",
"لحد":"up to",
"لوجو":"Logo",
"لوجو + ألوان + خطوط + قوالب سوشيال + هوية متكاملة لبراندك.":"Logo + colors + fonts + social templates + full identity for your brand.",
"لوجو احترافي مميز + نسخة ملونة وأبيض وأسود + تسليم PNG و PDF جاهز للاستخدام.":"A unique pro logo + color, black & white versions + ready PNG & PDF.",
"لوجو أساسي + نسخ فرعية + ألوان + خطوط + قوالب سوشيال + دليل استخدام الهوية. البراند كله جاهز.":"Main logo + sub versions + colors + fonts + social templates + brand guide. All ready.",
"لوجو مميز يعيش مع البراند ويشتغل على كل المقاسات.":"A distinctive logo that lives with the brand at every size.",
"متاحة لمشاريع جديدة • تسليم خلال 48 ساعة":"Available for new projects • 48h delivery",
"مش بس ألوان":"Not just colors",
"مش تصميم حلو وخلاص — كل لون وخط وفونت مدروس عشان يعكس شخصية البراند بتاعك ويخاطب جمهورك الصح.":"Not just pretty design — every color and font is chosen to reflect your brand.",
"مش عارفة تختاري؟ ابعتيلي فكرتك وأنا أرشحلك الأنسب 💜":"Not sure? Send your idea and I'll recommend the best 💜",
"مصممة بتفهم":"A designer who gets",
"مطبوعات":"Prints",
"معي":"Me",
"مكان تصميم سوشيال":"Social design spot",
"مكان تصميم لوجو":"Logo design spot",
"مكان كاروسيل":"Carousel spot",
"مكان كامبين":"Campaign spot",
"مكان مطبوعات":"Print spot",
"مكان هوية بصرية":"Identity spot",
"من دفع الديبوزت":"from deposit payment",
"موافقة — اطلبي تصميمك ✨":"Agreed — order your design ✨",
"هوية بريميوم":"Premium identity",
"هوية بصرية":"Brand identity",
"هوية بصرية كاملة":"Full brand identity",
"واتساب مباشر":"Direct WhatsApp",
"واستبدلي البلوك ده بصورة":"and replace this block with an image",
"وأكتر من":"and more than",
"ويبيع أكتر.":"and sells more.",
"يبدأ من / حسب الحجم":"from / depending on size",
"🎠 كاروسيل 4 سلايد — $30":"🎠 4-slide carousel — $30",
"🏢 شركات اشتغلت معاها":"🏢 Companies I worked with",
"👑 بريميوم":"👑 Premium",
"👑 هوية بصرية كاملة — $199":"👑 Full brand identity — $199",
"📅 سنوات خبرة":"📅 Years experience",
"📣 كامبين — تبدأ من $25":"📣 Campaign — from $25",
"📱 سوشيال ميديا — $10":"📱 Social media — $10",
"🔥 للبراندات":"🔥 For brands",
"🖨️ مطبوعات — يبدأ من $12":"🖨️ Prints — from $12",
"🟢 عميل على Upwork":"🟢 Clients on Upwork",
"🟣 عميل على Fiverr":"🟣 Clients on Fiverr",
"تم تجهيز طلبك! أكملي الإرسال على واتساب ✅":"Your order is ready! Complete sending on WhatsApp ✅",
"فيسبوك":"Facebook",
"انستجرام":"Instagram",
"واتساب":"WhatsApp",
"طريقة التواصل *":"Contact method *",
"💬 واتساب":"💬 WhatsApp",
"📸 انستجرام":"📸 Instagram",
"اتنسخت رسالتك! الصقيها في رسالة الانستجرام ✅":"Message copied! Paste it in the Instagram DM ✅",
"إرسال الطلب على واتساب 🚀":"Send order via WhatsApp 🚀",
"إرسال الطلب على انستجرام 📸":"Send order via Instagram 📸"
};
const TITLE_EN = {
"Salma Mokhtar | جرافيك ديزاينر":"Salma Mokhtar | Graphic Designer",
"الخدمات والأسعار | Salma Mokhtar":"Services & Pricing | Salma Mokhtar",
"أعمالي | Salma Mokhtar":"My Work | Salma Mokhtar",
"تواصلي معي | Salma Mokhtar":"Contact Me | Salma Mokhtar"
};
const _origText = new Map();
const _origTitle = document.title;
function _walkTextNodes(cb){
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n){
      if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const el = n.parentElement;
      if(!el || el.closest('script,style,[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(cb);
}
function setLang(l){
  try{ localStorage.setItem('sm-lang', l); }catch(e){}
  document.documentElement.lang = l === 'en' ? 'en' : 'ar';
  document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl';
  const btn = document.getElementById('langBtn');
  if(btn) btn.textContent = l === 'en' ? 'عربي' : 'EN';
  document.title = l === 'en' ? (TITLE_EN[_origTitle] || _origTitle) : _origTitle;
  if(l === 'en'){
    _walkTextNodes(n => {
      const key = n.nodeValue.trim();
      if(I18N[key]){
        if(!_origText.has(n)) _origText.set(n, n.nodeValue);
        n.nodeValue = n.nodeValue.replace(key, I18N[key]);
      }
    });
    document.querySelectorAll('[data-en-ph]').forEach(el => {
      if(!el.dataset.phAr) el.dataset.phAr = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', el.dataset.enPh);
    });
  }else{
    _origText.forEach((orig, n) => { try{ n.nodeValue = orig; }catch(e){} });
    document.querySelectorAll('[data-en-ph]').forEach(el => {
      if(el.dataset.phAr) el.setAttribute('placeholder', el.dataset.phAr);
    });
  }
  try{ updateSubmitBtn(); }catch(e){}
}
function toggleLang(){
  const cur = document.documentElement.lang === 'en' ? 'en' : 'ar';
  setLang(cur === 'en' ? 'ar' : 'en');
}
window.toggleLang = toggleLang;
window.setLang = setLang;
// Submit button label follows the chosen contact method
function updateSubmitBtn(){
  const btn = document.getElementById('submitBtn');
  if(!btn) return;
  const picked = document.querySelector('input[name="method"]:checked');
  const method = picked ? picked.value : 'whatsapp';
  const isEn = document.documentElement.lang === 'en';
  btn.textContent = method === 'instagram'
    ? (isEn ? 'Send order via Instagram 📸' : 'إرسال الطلب على انستجرام 📸')
    : (isEn ? 'Send order via WhatsApp 🚀' : 'إرسال الطلب على واتساب 🚀');
}
window.updateSubmitBtn = updateSubmitBtn;
try{
  const saved = localStorage.getItem('sm-lang');
  if(saved === 'en') setLang('en');
}catch(e){}
