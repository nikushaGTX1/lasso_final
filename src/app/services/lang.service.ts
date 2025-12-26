import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LangService {

  constructor(private http: HttpClient) {}

  private api = 'https://webapplication1-2jq8.onrender.com/api/Api';

  lang = localStorage.getItem('lang') || 'en';

  aboutTexts: Record<string, string> = {};

  setLang(l: string) {
    this.lang = l;
    localStorage.setItem('lang', l);
  }

  texts: any = {

    // ================= ENGLISH =================
    en: {

      // NAVBAR
      home: "HOME",
      products: "PRODUCTS",
      anti: "ANTI-COUNTERFEIT",
      about: "ABOUT US",
      contact: "CONTACT US",
      admin: "ADMIN PANEL",

      // LOGIN
      loginTitle: "Admin Login",
      loginSub: "Sign in to manage products",
      email: "Email",
      password: "Password",
      loginBtn: "Login",

      // HOME
      bannerBtn: "View More",

      aboutTitle: "ABOUT US",
      aboutText:
        "We created this platform to offer customers high-quality and safe products made with natural ingredients. We treat every customer with care and are always ready to help. Our goal is to ensure that everyone feels comfortable and protected when using our products.",

      aboutBtn: "View More",

      // ABOUT PAGE
      aboutHeroTitle: "ABOUT US",
      aboutHeroText:
        "We created this platform to offer customers high-quality and safe products made with natural ingredients. We treat every customer with care and are always ready to help. Our goal is to ensure that everyone feels comfortable and protected when using our products.",

      aboutWho: "Who We Are",
      aboutWhoText: "Our company is focused on offering high-quality, reliable products made with natural ingredients.",
      aboutPhilosophy: "Our Philosophy",
      aboutPhilosophyText: "Our work is dedicated to the continuous improvement of quality standards, transparency, and customer care. We pay attention to every detail to ensure reliability and effectiveness in our products.",
      aboutMission: "Our Mission",
      aboutMissionText: "Our mission is to offer customers trustworthy, clinically reliable products that meet modern requirements and safety standards. We strive to be a responsible and dependable partner for every customer.",
      aboutTrust: "Trusted by thousands of customers worldwide",
      aboutExploreBtn: "Explore Products",

      // ================= CONTACT PAGE =================
      contactHeroTitle: "Contact Us",
      contactHeroText:
        "We’re here to help with product questions, support or business inquiries. Reach us directly by phone.",
      callUsTitle: "Call Us",
      callUsDesc: "Our support team is available daily to assist you.",
      callBtn: "Call Us",

      // ================= ADMIN PANEL =================
      adminPanelTitle: "Admin Panel",
      adminAddCardTitle: "Add New Card",
      adminEditCardTitle: "Edit Card",
      adminExistingCards: "Existing Cards",
      adminPrevious: "Previous",
      adminNext: "Next",

      // ADMIN — ABOUT TEXT SECTION
      adminAboutSection: "About Page Texts",
      adminSaveAboutTexts: "Save About Texts",

      adminHeroTitle: "Hero Title",
      adminHeroText: "Hero Text",

      adminWhoTitle: "Who We Are Title",
      adminWhoText: "Who We Are Text",

      adminPhilosophyTitle: "Philosophy Title",
      adminPhilosophyText: "Philosophy Text",

      adminMissionTitle: "Mission Title",
      adminMissionText: "Mission Text",

      adminTrustTitle: "Trust Title",
      adminExploreBtnText: "Explore Button Text"
    },


    // ================= GEORGIAN =================
    geo: {

      home: "მთავარი",
      products: "პროდუქცია",
      anti: "ყალბის საწინააღმდეგო",
      about: "ჩვენ შესახებ",
      contact: "კონტაქტი",
      admin: "ადმინის პანელი",

      loginTitle: "ადმინის შესვლა",
      loginSub: "შედით პროდუქციის სამართავად",
      email: "ელ. ფოსტა",
      password: "პაროლი",
      loginBtn: "შესვლა",

      bannerBtn: "მეტის ნახვა",

      aboutTitle: "ჩვენ შესახებ",
      aboutText:
        "ჩვენ შევქმენით ეს პლატფორმა, რათა მომხმარებლებს შევთავაზოთ ხარისხიანი და უსაფრთხო პროდუქცია ბუნებრივი ინგრედიენტებით. ყოველ მომხმარებელს ყურადღებით ვუდგებით და ყოველთვის მზად ვართ დახმარებისთვის. ჩვენი მიზანია, რომ თითოეულმა ადამიანმა თავი კომფორტულად და დაცულად იგრძნოს ჩვენი პროდუქტის გამოყენებისას.",

      aboutBtn: "მეტის ნახვა",

      aboutHeroTitle: "ჩვენ შესახებ",
      aboutHeroText: "ჩვენ შევქმენით ეს პლატფორმა, რათა მომხმარებლებს შევთავაზოთ ხარისხიანი და უსაფრთხო პროდუქცია ბუნებრივი ინგრედიენტებით. ყოველ მომხმარებელს ყურადღებით ვუდგებით და ყოველთვის მზად ვართ დახმარებისთვის. ჩვენი მიზანია, რომ თითოეულმა ადამიანმა თავი კომფორტულად და დაცულად იგრძნოს ჩვენი პროდუქტის გამოყენებისას.",
      aboutWho: "ვინ ვართ ჩვენ",
      aboutWhoText: "ჩვენი კომპანია ორიენტირებულია მაღალი ხარისხის, სანდო და ბუნებრივ ინგრედიენტებზე დაფუძნებული პროდუქციის შეთავაზებაზე. ვმუშაობთ პასუხისმგებლობითა და პროფესიონალიზმით, რათა ჩვენს მომხმარებლებს მივაწოდოთ უსაფრთხო და ეფექტური გადაწყვეტილებები.",
      aboutPhilosophy: "ჩვენი ფილოსოფია",
      aboutPhilosophyText: "ჩვენი საქმიანობა მიმართულია ხარისხის სტანდარტების მუდმივ გაუმჯობესებაზე, გამჭვირვალობაზე და მომხმარებელზე ზრუნვაზე. ყურადღებას ვაქცევთ თითოეულ დეტალს, რათა უზრუნველვყოთ პროდუქციის საიმედოობა და შედეგიანობა.",
      aboutMission: "ჩვენი მისია",
      aboutMissionText: "ჩვენი მისიაა მომხმარებლებს შევთავაზოთ იმედზე დაფუძნებული და კლინიკურად სანდო პროდუქცია, რომელიც აკმაყოფილებს თანამედროვე მოთხოვნებსა და უსაფრთხოების ნორმებს. ვცდილობთ, ვიყოთ პასუხისმგებელი და საიმედო პარტნიორი თითოეული მომხმარებლისთვის.",
      aboutTrust: "სანდო მსოფლიოს ათასობით მომხმარებლისთვის",
      aboutExploreBtn: "პროდუქციის ნახვა",

      // CONTACT
      contactHeroTitle: "დაგვიკავშირდით",
      contactHeroText:
        "თუ გაქვთ კითხვები, გჭირდებათ დახმარება ან ბიზნეს თანამშრომლობა — დაგვირეკეთ.",
      callUsTitle: "დაგვირეკეთ",
      callUsDesc: "ჩვენი გუნდი მზადაა დაგეხმაროთ ყოველდღე.",
      callBtn: "ზარი",

      // ================= ADMIN PANEL =================
      adminPanelTitle: "ადმინის პანელი",
      adminAddCardTitle: "ახალი ბარათის დამატება",
      adminEditCardTitle: "ბარათის რედაქტირება",
      adminExistingCards: "არსებული ბარათები",
      adminPrevious: "წინა",
      adminNext: "შემდეგი",

      adminAboutSection: "ჩვენ შესახებ გვერდის ტექსტები",
      adminSaveAboutTexts: "ტექსტების შენახვა",

      adminHeroTitle: "ჰერო სათაური",
      adminHeroText: "ჰერო ტექსტი",

      adminWhoTitle: "ვინ ვართ ჩვენ — სათაური",
      adminWhoText: "ვინ ვართ ჩვენ — ტექსტი",

      adminPhilosophyTitle: "ფილოსოფიის სათაური",
      adminPhilosophyText: "ფილოსოფიის ტექსტი",

      adminMissionTitle: "მისიის სათაური",
      adminMissionText: "მისიის ტექსტი",

      adminTrustTitle: "სანდოობის ტექსტი",
      adminExploreBtnText: "ღილაკის ტექსტი"
    }
  };


  loadAboutTexts() {
    this.http.get<Record<string, string>>(`${this.api}/about-texts`)
      .subscribe({
        next: (res) => this.aboutTexts = res || {},
        error: (err) => console.error('Failed to load about texts', err)
      });
  }


  t(key: string) {

    const map: any = {
      aboutHeroTitle: 'About_HeroTitle',
      aboutHeroText: 'About_HeroText',
      aboutWho: 'About_Who',
      aboutWhoText: 'About_WhoText',
      aboutPhilosophy: 'About_Philosophy',
      aboutPhilosophyText: 'About_PhilosophyText',
      aboutMission: 'About_Mission',
      aboutMissionText: 'About_MissionText',
      aboutTrust: 'About_Trust',
      aboutExploreBtn: 'About_ExploreBtn'
    };

    const dbKey = map[key];

    if (this.lang === 'en' && dbKey && this.aboutTexts[dbKey]) {
      return this.aboutTexts[dbKey];
    }

    const group = this.texts[this.lang];
    if (!group) return key;
    if (!group[key]) return key;

    return group[key];
  }
}
