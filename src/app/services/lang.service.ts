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
        "We want to adhere to the concept, in order to bring customers\n" +
        "better products.\n\n" +
        "In order to make all the pain can be understated.\n" +
        "All for customers\n" +
        "Yiganerjing Official",

      aboutBtn: "View More",

      // ABOUT PAGE
      aboutHeroTitle: "ABOUT US",
      aboutHeroText:
        "We focus on delivering safe, herbal-based skincare solutions designed " +
        "to help our customers feel confident, comfortable, and healthy.",

      aboutWho: "Who We Are",
      aboutWhoText: "Our brand is built on trust, quality, and herbal innovation...",
      aboutPhilosophy: "Our Philosophy",
      aboutPhilosophyText: "We believe nature holds the best remedies...",
      aboutMission: "Our Mission",
      aboutMissionText: "To provide reliable and affordable skincare products...",
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
      products: "პროდუქტები",
      anti: "ყალბის საწინააღმდეგო",
      about: "ჩვენ შესახებ",
      contact: "კონტაქტი",
      admin: "ადმინის პანელი",

      loginTitle: "ადმინის შესვლა",
      loginSub: "შედით პროდუქციის სამართავად",
      email: "ელ. ფოსტა",
      password: "პაროლი",
      loginBtn: "შესვლა",

      bannerBtn: "მეტი ნახვა",

      aboutTitle: "ჩვენ შესახებ",
      aboutText:
        "ჩვენ გვინდა შევინარჩუნოთ ხარისხის კონცეფცია...\n" +
        "ყველაფერი მომხმარებლისთვის\n" +
        "Yiganerjing ოფიციალური",

      aboutBtn: "მეტი ნახვა",

      aboutHeroTitle: "ჩვენ შესახებ",
      aboutHeroText: "ჩვენ ვქმნით უსაფრთხო ბალახოვან პროდუქტებს...",
      aboutWho: "ვინ ვართ ჩვენ",
      aboutWhoText: "ჩვენი ბრენდი დაფუძნებულია ნდობაზე...",
      aboutPhilosophy: "ჩვენი ფილოსოფია",
      aboutPhilosophyText: "ჩვენ გვწამს ბუნებრივი საშუალებები...",
      aboutMission: "ჩვენი მისია",
      aboutMissionText: "სანდო და ხელმისაწვდომი პროდუქცია...",
      aboutTrust: "სანდო მსოფლიოს ათასობით მომხმარებლისთვის",
      aboutExploreBtn: "პროდუქტების ნახვა",

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
