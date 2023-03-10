"use strict";
/* Element */
const $applianceFinder = $('#applianceFinder'),
   $finderMain = $applianceFinder.find('#finderMain'),
   $selectWrap = $applianceFinder.find('#selectWrap'),
   $qnaImgWrap = $applianceFinder.find('#qnaImgWrap'),
   $qnaWrap = $applianceFinder.find('.qna_wrap'),
   $description = $applianceFinder.find('.qna_description'),
   $descHeadWrap = $applianceFinder.find('.qna_description01'),
   $descDetailWrap = $applianceFinder.find('.qna_description02'),
   $descIcon = $applianceFinder.find('.qna_description01 .txt_box i'),
   $descHead = $applianceFinder.find('.qna_description01 .txt_box p'),
   $descDetail = $applianceFinder.find('.qna_description02 .txt_box p'),
   $centerImgWrap = $applianceFinder.find('.center_img_wrap'),
   $introAnimation = $applianceFinder.find("#introAnimation"),
   $popupStp3 = $applianceFinder.find('.popup_step03'),
   $subContain = $applianceFinder.find('.sub_contain');

/* Button */
const $nextBtn = $applianceFinder.find('#nextStepBtn'),
   $backBtn = $applianceFinder.find('#backStepBtn'),
   $showNow = $applianceFinder.find('#shopNowBtn'),
   $finalShowNow = $applianceFinder.find('#shopNowBtn02'),
   $tryAgain = $applianceFinder.find('#tryAgain'),
   $detailCloseBtn = $applianceFinder.find('#detailCloseBtn'),
   $popupClose = $applianceFinder.find('.popup_close_btn'),
   $interactionClose = $applianceFinder.find('.close_btn'),
   $loadMoreBtn = $applianceFinder.find('.load_more_btn'),
   $learnMoreBtn = $applianceFinder.find('.learn_more_btn');

/* Type */
const MULTI = 'MULTI';
const AMERICAN = 'AMERICAN';
const TALL = 'TALL';
const DOUBLE = 'DOUBLE';
const LADER = 'LADER';

/* Capacity */
const CAPACITY_UNDER_400L = 'CAPACITY_UNDER_400L';
const CAPACITY_SPACE_400L_500L = 'CAPACITY_SPACE_400L_500L';
const CAPACITY_SPACE_500L_600L = 'CAPACITY_SPACE_500L_600L';
const CAPACITY_600L_OR_MORE = 'CAPACITY_600L_OR_MORE';

/* Size */
const DEPTH_UNDER_760MM = 'DEPTH_UNDER_760MM';
const WIDTH_UNDER_600MM = 'WIDTH_UNDER_600MM';
const WIDTH_SPANCE_610MM_800MM = 'WIDTH_SPANCE_610MM_800MM';
const WIDTH_SPANCE_810MM_900MM = 'WIDTH_SPANCE_810MM_900MM';
const WIDTH_SPANCE_910MM_OR_MORE = 'WIDTH_SPANCE_910MM_OR_MORE';
const HEIGHT_UNDER_1800MM = 'HEIGHT_UNDER_1800MM';
const HEIGHT_SPANCE_1800MM_2000MM = 'HEIGHT_SPANCE_1800MM_2000MM';
const HEIGHT_2000L_OR_MORE = 'HEIGHT_2000L_OR_MORE';

/* Feature */
const PLUMBED = 'PLUMBED';
const NON_PLUMBED = 'NON_PLUMBED';
const WATER_ONLY = 'WATER_ONLY';
const PURE_N_FRESH = 'PURE_N_FRESH';
const INSTAVIEW = 'INSTAVIEW';
const THINKQ = 'THINKQ';

/* Energy Grade */
const ENERGY_GRADE_A = 'ENERGY_GRADE_A';
const ENERGY_GRADE_B = 'ENERGY_GRADE_B';
const ENERGY_GRADE_C = 'ENERGY_GRADE_C';
const ENERGY_GRADE_D = 'ENERGY_GRADE_D';
const ENERGY_GRADE_E = 'ENERGY_GRADE_E';
const ENERGY_GRADE_F = 'ENERGY_GRADE_F';

/* Color */
const BLACK = 'BLACK';
const STAINLESS = 'STAINLESS';
const SILVER = 'SILVER';
const WHITE = 'WHITE';
const BEIGE = 'BEIGE';

/* Select All */
const SELECTALL = 'SELECTALL';

/* AnyThing */
const ANYTHING = 'ANYTHING';

/* Text */
const multipleSelectionContent = 'Scegli tutte le opzioni che vuoi.';
const selectAllContent = 'Tutte le opzioni';
const anythingContent = 'Non ho particolari esigenze, </br>fammi vedere tutti i modelli.';
const nextContent = 'AVANTI';

let idx = 0;
let stageIdx;
let stageDesc;
let stageCont;
let headerHeight = $('header').outerHeight();
let selectedParameters;
let stepCount = [];

/* Spec Sit Product Name / Value */
const productSpec = {
   'product1': [MULTI, CAPACITY_600L_OR_MORE, DEPTH_UNDER_760MM, WIDTH_SPANCE_910MM_OR_MORE, HEIGHT_UNDER_1800MM, ENERGY_GRADE_F, THINKQ, PLUMBED, PURE_N_FRESH, INSTAVIEW, BLACK],
   'product2': [MULTI, CAPACITY_600L_OR_MORE, DEPTH_UNDER_760MM, WIDTH_SPANCE_910MM_OR_MORE, HEIGHT_UNDER_1800MM, ENERGY_GRADE_E, THINKQ, PLUMBED, PURE_N_FRESH, SILVER],
   'product3': [MULTI, CAPACITY_SPACE_500L_600L, DEPTH_UNDER_760MM, WIDTH_SPANCE_810MM_900MM, HEIGHT_UNDER_1800MM, ENERGY_GRADE_E, THINKQ, PLUMBED, PURE_N_FRESH, INSTAVIEW, STAINLESS],
   'product4': [MULTI, CAPACITY_SPACE_500L_600L, DEPTH_UNDER_760MM, WIDTH_SPANCE_810MM_900MM, HEIGHT_UNDER_1800MM, ENERGY_GRADE_C, NON_PLUMBED, INSTAVIEW, THINKQ, WHITE],
   'product5': [MULTI, CAPACITY_UNDER_400L, DEPTH_UNDER_760MM, WIDTH_SPANCE_910MM_OR_MORE, HEIGHT_UNDER_1800MM, ENERGY_GRADE_D, WATER_ONLY, STAINLESS],
}

/* Config Data */
const configData = {
   step01: {
      questionText: 'step01 질문?',
      defaultScreenImg: 'step01/que_img00.png',
      option: [
         {
            value: MULTI,
            content: 'Multidoor',
            relevantData: {
               description: 'Caratterizzato dalla grande capacità e dagli scompartimenti frigo e congelatore uno sopra l’altro.',
               qnaScreenImg: 'step01/que_img01.png',
               learnMore: {
                  interactionPage: 'multi',
               },
            },
            saveImg: {
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step06/multi_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: AMERICAN,
            content: 'Side-by-Side',
            relevantData: {
               description: 'Ideale se cerchi un modello dalla grande capacità, ha il frigorifero a destra e il congelatore a sinistra.',
               qnaScreenImg: 'step01/que_img02.png',
               learnMore: {
                  interactionPage: 'american',
               },

            },
            saveImg: {
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step06/multi_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: TALL,
            content: 'Combinato',
            relevantData: {
               description: 'Il modello di frigorifero a due porte più diffuso in Italia, con frigo nella parte superiore e congelatore in quella inferiore.',
               qnaScreenImg: 'step01/que_img03.png',
               learnMore: {
                  interactionPage: 'tall',
               },
            },
            saveImg: {
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step06/multi_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: DOUBLE,
            content: 'Side-by-Side',
            relevantData: {
               description: 'Ideale se cerchi un modello dalla grande capacità, ha il frigorifero a destra e il congelatore a sinistra.',
               qnaScreenImg: 'step01/que_img02.png',
               learnMore: {
                  interactionPage: 'american',
               },
            },
         },
         {
            value: LADER,
            content: 'Maxi Side-by-Side componibile',
            relevantData: {
               description: 'La soluzione ideale se desideri frigorifero e congelatore separati.',
               qnaScreenImg: 'step01/que_img05.png',
               learnMore: {
                  interactionPage: 'lader',
               },
            },
         },
      ]
   },
   step02: {
      questionText: 'step02 질문?',
      defaultScreenImg: 'step02/que_img00.png',
      option: [
         {
            value: SELECTALL,
            content: 'step02 content1',
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
      ]
   },
   step03: {
      questionText: 'step03 질문?',
      defaultScreenImg: 'step01/que_img00.png',
      name: ['depth', 'width', 'height'],
      relevantData: {
         description: {
            head: 'Come misurare lo spazio che hai a disposizione per un nuovo frigorifero.',
            detail: 'Individua il punto in cui vuoi installare il frigo e prendi le misure dello spazio disponibile. Le porte necessitano dai 25 ai 50mm di spazio per l’apertura e la ventilazione. Sconsigliamo l’installazione vicino a zone molto calde o molto fredde.'
         },
         learnMore: {
            additionalDesc: true,
         },
         icon: 'step03/disc_icon01.png',
      },
      subStep: {
         option: [
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
         ],
         option: [
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
         ],
         option: [
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
            {
               value: CAPACITY_UNDER_400L,
               content: 'step02 content2',
            },
         ],
      }
   },
   step04: {
      questionText: 'step04 질문?',
      defaultScreenImg: 'step02/que_img00.png',
      option: [
         {
            value: SELECTALL,
            content: 'step02 content1',
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Con allacciamento idrico',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Senza allacciamento idrico',
            relevantData: {
               description: {
                  head: 'Il dispenser preleva l’acqua da una tanica interna al frigorifero che dovrai riempire di volta in volta.',
                  detail: 'Quando non hai a disposizione un rubinetto dell’acqua nelle vicinanze, i frigoriferi con tanica interna sono la soluzione ideale per avere acqua fresca e ghiaccio ogni volta che vuoi.'
               },
               qnaScreenImg: 'step04/que_img03.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Senza allacciamento idrico </br>(solo acqua)',
            relevantData: {
               description: {
                  head: 'Goditi dell’acqua sempre fresca tutte le volte che vuoi.',
                  detail: 'Una soluzione pratica per avere sempre pronta dell’acqua fresca grazie alla tanica interna al frigorifero.'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
   step05: {
      questionText: 'step05 질문?',
      defaultScreenImg: 'step02/que_img00.png',
      option: [
         {
            value: SELECTALL,
            content: 'step02 content1',
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Con allacciamento idrico',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Senza allacciamento idrico',
            relevantData: {
               description: {
                  head: 'Il dispenser preleva l’acqua da una tanica interna al frigorifero che dovrai riempire di volta in volta.',
                  detail: 'Quando non hai a disposizione un rubinetto dell’acqua nelle vicinanze, i frigoriferi con tanica interna sono la soluzione ideale per avere acqua fresca e ghiaccio ogni volta che vuoi.'
               },
               qnaScreenImg: 'step04/que_img03.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Senza allacciamento idrico </br>(solo acqua)',
            DataNon: true,
         },
      ]
   },
   step06: {
      questionText: 'step06 질문?',
      defaultScreenImg: 'step02/que_img00.png',
      option: [
         {
            value: SELECTALL,
            content: 'step02 content1',
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Con allacciamento idrico',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Senza allacciamento idrico',
            relevantData: {
               description: {
                  head: 'Il dispenser preleva l’acqua da una tanica interna al frigorifero che dovrai riempire di volta in volta.',
                  detail: 'Quando non hai a disposizione un rubinetto dell’acqua nelle vicinanze, i frigoriferi con tanica interna sono la soluzione ideale per avere acqua fresca e ghiaccio ogni volta che vuoi.'
               },
               qnaScreenImg: 'step04/que_img03.png',
            }
         },
         {
            value: CAPACITY_UNDER_400L,
            content: 'Senza allacciamento idrico </br>(solo acqua)',
            relevantData: {
               description: {
                  head: 'Goditi dell’acqua sempre fresca tutte le volte che vuoi.',
                  detail: 'Una soluzione pratica per avere sempre pronta dell’acqua fresca grazie alla tanica interna al frigorifero.'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
}


popupSlide();
main();
function imgPreload() {
   function preloading(imageArray) {
      let imgNum = imageArray.length;
      for (let i = 0; i < imgNum; i++) {
         let img = new Image();
         img.src = imageArray[i];
      }
   }
   preloading([
      // common
      './images/pc/common/back_btn_icon.png',
      './images/pc/common/bg_bottom_deco.png',
      './images/pc/common/bg_top_deco.png',
      './images/pc/common/interactive_popup_bg_bottom_deco.png', 
      './images/pc/common/interactive_popup_bg_top_deco.png',
      './images/pc/common/next_btn_icon.png',
      './images/pc/common/next_btn_icon2.png',
      './images/pc/common/shop_now_character.png',
      './images/pc/common/try_again_icon.png',
      './images/common/video01_poster_img.jpg',

      // result
      './images/pc/result/bg_unit.jpg',
      './images/pc/result/center_img01.png',
      './images/pc/result/center_img02.png',
      './images/pc/result/center_img03.png',
      './images/pc/result/center_img04.png',
      './images/pc/result/center_img05.png',

      // step01
      './images/pc/step01/btn_icon01.png',
      './images/pc/step01/btn_icon01_on.png',
      './images/pc/step01/btn_icon02.png',
      './images/pc/step01/btn_icon02_on.png',
      './images/pc/step01/btn_icon03.png',
      './images/pc/step01/btn_icon03_on.png',
      './images/pc/step01/btn_icon04.png',
      './images/pc/step01/btn_icon04_on.png',
      './images/pc/step01/btn_icon05.png',
      './images/pc/step01/btn_icon05_on.png',
      './images/pc/step01/popup_contents_img01.png',
      './images/pc/step01/popup_contents_img02.png',
      './images/pc/step01/popup_contents_img03.png',
      './images/pc/step01/popup_contents_img04.png',
      './images/pc/step01/popup_contents_img05.png',
      './images/pc/step01/popup_icon01.png',
      './images/pc/step01/popup_icon02.png',
      './images/pc/step01/popup_icon03.png',
      './images/pc/step01/popup_icon04.png',
      './images/pc/step01/popup_icon05.png',
      './images/pc/step01/que_img00.png',
      './images/pc/step01/que_img01.png',
      './images/pc/step01/que_img01.png',
      './images/pc/step01/que_img03.png',
      './images/pc/step01/que_img04.png',
      './images/pc/step01/que_img05.png',
      './images/pc/step01/txt_bubble_icon.png',

      // step02
      './images/pc/step02/btn_icon01.png',
      './images/pc/step02/btn_icon01_on.png',
      './images/pc/step02/btn_icon02.png',
      './images/pc/step02/btn_icon02_on.png',
      './images/pc/step02/btn_icon03.png',
      './images/pc/step02/btn_icon03_on.png',
      './images/pc/step02/btn_icon04.png',
      './images/pc/step02/btn_icon04_on.png',
      './images/pc/step02/disc_icon01.png',
      './images/pc/step02/disc_icon02.png',
      './images/pc/step02/disc_icon03.png',
      './images/pc/step02/disc_icon04.png',
      './images/pc/step02/people_icon.png',
      './images/pc/step02/que_img01.png',
      './images/pc/step02/que_img02.png',
      './images/pc/step02/que_img03.png',
      './images/pc/step02/que_img04.png',
      './images/pc/step02/que_img05.png',
      './images/pc/step02/txt_bubble_icon.png',

      // step03
      './images/pc/step03/caution_icon.png',
      './images/pc/step03/disc_icon01.png',
      './images/pc/step03/popup_img01_1.jpg',
      './images/pc/step03/popup_img01_2.jpg',
      './images/pc/step03/popup_img02_1.jpg',
      './images/pc/step03/popup_img02_2.jpg',
      './images/pc/step03/popup_img03_1.jpg',
      './images/pc/step03/popup_img04_1.jpg',
      './images/pc/step03/popup_img05_1.jpg',
      './images/pc/step03/popup_img05_2.jpg',

      // step04
      './images/pc/step04/btn_icon01.png',
      './images/pc/step04/btn_icon02.png',
      './images/pc/step04/btn_icon03.png',
      './images/pc/step04/que_img01.png',
      './images/pc/step04/que_img02.png',
      './images/pc/step04/que_img03.png',
      './images/pc/step04/que_img04.png',

      // step05
      './images/pc/step05/btn_icon01.png',
      './images/pc/step05/btn_icon02.png',
      './images/pc/step05/btn_icon03.png',
      './images/pc/step05/btn_icon04.png',
      './images/pc/step05/que_img01.png',
      './images/pc/step05/que_img02.png',
      './images/pc/step05/que_img03.png',
      './images/pc/step05/que_img04.png',
      './images/pc/step05/que_img05.png',

      // step06
      './images/pc/step06/american_black_popup_img.png',
      './images/pc/step06/american_que_img01.png',
      './images/pc/step06/american_que_img02.png',
      './images/pc/step06/american_que_img03.png',
      './images/pc/step06/american_que_img04.png',
      './images/pc/step06/american_silver_popup_img.png',
      './images/pc/step06/american_steel_popup_img.png',
      './images/pc/step06/american_white_popup_img.png',
      './images/pc/step06/double_beige_popup_img.png',
      './images/pc/step06/double_black_popup_img.png',
      './images/pc/step06/double_que_img01.png',
      './images/pc/step06/double_que_img02.png',
      './images/pc/step06/double_que_img03.png',
      './images/pc/step06/double_que_img04.png',
      './images/pc/step06/double_que_img05.png',
      './images/pc/step06/double_silver_popup_img.png',
      './images/pc/step06/double_steel_popup_img.png',
      './images/pc/step06/double_white_popup_img.png',
      './images/pc/step06/lader_black_popup_img.png',
      './images/pc/step06/lader_que_img01.png',
      './images/pc/step06/lader_que_img02.png',
      './images/pc/step06/lader_que_img03.png',
      './images/pc/step06/lader_que_img04.png',
      './images/pc/step06/lader_silver_popup_img.png',
      './images/pc/step06/lader_steel_popup_img.png',
      './images/pc/step06/lader_white_popup_img.png',
      './images/pc/step06/multi_black_popup_img.png',
      './images/pc/step06/multi_que_img01.png',
      './images/pc/step06/multi_que_img02.png',
      './images/pc/step06/multi_que_img03.png',
      './images/pc/step06/multi_que_img04.png',
      './images/pc/step06/multi_silver_popup_img.png',
      './images/pc/step06/multi_steel_popup_img.png',
      './images/pc/step06/multi_white_popup_img.png',
      './images/pc/step06/tall_beige_popup_img.png',
      './images/pc/step06/tall_black_popup_img.png',
      './images/pc/step06/tall_que_img01.png',
      './images/pc/step06/tall_que_img02.png',
      './images/pc/step06/tall_que_img03.png',
      './images/pc/step06/tall_que_img04.png',
      './images/pc/step06/tall_que_img05.png',
      './images/pc/step06/tall_silver_popup_img.png',
      './images/pc/step06/tall_steel_popup_img.png',
      './images/pc/step06/tall_white_popup_img.png',
   ]);
}
function main() {
   // class Subject {
   //    constructor() {
   //       this.observers = [];
   //    }

   //    getObserverList() {
   //       return this.observers;
   //    }

   //    subscribe(observer) {
   //       this.observers.push(observer);
   //    }

   //    unsubscribe(observer) {
   //       this.observers = this.observers.filter(
   //          (obs) => obs !== observer
   //       );
   //    }
   //    notifyAll() {
   //       this.observers.forEach((subscriber) => {
   //          try {
   //             subscriber.update(this.constructor.name);
   //          } catch (error) {
   //             console.log(error);
   //          }
   //       });
   //       console.log('complete : ', this.observers);
   //    }
   // }

   // class Observer {
   //    constructor(name) {
   //       this.name = name;
   //    }
   //    update(subj) {
   //       console.log(`${this.name}`);
   //    }

   // } //주제 객체 만들기
   // const subj = new Subject();
   // // 옵저버 만들기
   // const obj1 = new Observer("1번 구독자");
   // const obj2 = new Observer("2번 구독자");
   // const obj3 = new Observer("3번 구독자");
   // // 구독하기
   // subj.subscribe(obj1);
   // $(".resister").on("click", function () {
   //    subj.subscribe(obj2);
   //    console.log("추가");
   // });
   // // 구독자 정보 확인하기
   // console.log(subj.getObserverList());
   // // 알림보내기
   // subj.notifyAll(); // 구독해지
   // $(".delete").on("click", function () {
   //    subj.unsubscribe(obj2);
   //    console.log("삭제");
   // });
   // console.log('-------------------');
   // // 다시 보기
   // $(".complete").on("click", function () {
   //    subj.notifyAll();
   // });


   /* 랜딩페이지 URL */
   let resultPageUrl;
   let stageLiveDecide;
   let currentUrl = document.location.href;
   currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;
   if (stageLiveDecide) {
      resultPageUrl = './risultati-della-ricerca';
   } else {
      resultPageUrl = 'https://wwwstg.lg.com/it/frigoriferi/risultati-della-ricerca';
   }

   /* intro */
   let imgPath;
   let introJsonPath;
   let desktopWidthOrHigher = window.innerWidth >= 1024;
   if (desktopWidthOrHigher) {
      introJsonPath = './images/pc/intro/intro_animation.json';
      imgPath = './images/pc/';
      imgPreload();
   } else {
      introJsonPath = './images/intro/intro_animation.json';
      imgPath = './images/';
   }

   const introLottie = lottie.loadAnimation({
      container: document.getElementById('animationPlayer'),
      path: introJsonPath,
      renderer: 'svg',
      loop: false
   });


   let introDeleteAndRefresh = currentUrl.includes('intro=no');
   if (introDeleteAndRefresh) {
      $introAnimation.css('display', 'none');
      $quickFinder.css('display', 'block');
   } else {
      introLottie.addEventListener('complete', function () {
         TweenMax.to($introAnimation, .3, { opacity: 0, display: "none" });
         $(window).scrollTop(headerHeight);
      });
   }

   /* 다음 스텝 */
   function moveNextStep() {
      let _pressedNext = true;
      let _lastFinderIndex = Object.values(configData).length - 1;

      idx === _lastFinderIndex && resultChoice()
      if (idx < $(this).hasClass('active')) {
         idx++;
         stepMovement(_pressedNext);
      }
   }

   /* 이전 스텝 */
   function moveBackStep() {
      let _pressedNext = false;
      if (idx > 0) {
         idx--;
         stepMovement(_pressedNext);
      }
   }

   let _currentStructural = Object.values(configData)[idx]; // 현재 스텝 마크업
   let _currentStep = Object.keys(configData)[idx];
   /* 스텝 이동 */
   function stepMovement(_pressedNext) {
      for (let i in Object.keys(configData)) {
         console.log(Object.keys(configData)[i]);
         console.log(Object.values(configData)[i]);
      }

      let _lastAnswerValue; // 저장된 데이터에서 마지막 value 
      let _stepProductArray = []; // 스텝별 제품 추출

      // idx === 0 ? $backBtn.css('display', 'none') : $backBtn.css('display', 'block') // step 1에서 back 버튼 삭제

      MarkUpAndRefresh();
      productMatchingAndActivation();

      /* 옵션 클릭 이벤트 */
      $('.option_btn').on('click', answerSelect);
   }


   /* 초기화 & 구조 생성 */
   function MarkUpAndRefresh() {
      let _questionText = _currentStructural.questionText;
      let _defaultScreenImg = _currentStructural.defaultScreenImg;

      $('body,html').scrollTop(0);
      $descDetailWrap.removeClass('open');
      $showNow.removeClass('active');
      $finderMain.removeClass().addClass(_currentStep);
      $(window).scrollTop(headerHeight);
      $nextBtn.attr('data-link-name', "'" + nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
      $qnaWrap.prepend('<strong class="que_title">' + _questionText + '</strong>');
      $descHeadWrap.prepend('<strong>' + _questionText + '</strong>');
      $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _defaultScreenImg + ')');
      // $selectWrap.html('<button type="button" class="caution_open_btn">Clicca qui per vedere i consigli su misure e dimensioni.</button><p class="select_tit"><em>' + multipleSelectionContent + ' </em></p>');

      let _currentoption = _currentStructural.option;
      for (let i = 0; i < _currentoption.length; i++) { 
         $selectWrap.find('ol').append(`<li><button class="option_btn" type="button" data-value="${_currentoption[i].value}"><span></span><p>${_currentoption[i].content}</p></button></li>`);
         if (_currentoption[i].value === ANYTHING) {
            $selectWrap.find('ol li').eq(i).find('.option_btn').addClass('anything');
         }
      }
   }


   /* 제품 매칭 & 옵션 활성화 */
   function productMatchingAndActivation() {
      let _stepProductArray = [];
      let matchingProducts = [];

      console.log(matchingProducts.length < 1);

      // if (matchingProducts.length < 1) {
      //    let selectedValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; // value
      //    for (let value in productSpec) {
      //       if (product[key][_selectKey] === _selectValue) {
      //          _stepProductArray.push(product[key]);
      //       } 
      //    }
      //    matchingProducts.push(_stepProductArray);
      // }
   }

   /* 클릭 시 발생 함수 */
   function answerSelect() {
      let _this = $(this);
      let _currentOptionValue = _this.data('value');
      // console.log(_currentOptionValue)

      $loadMoreBtn.removeClass('active').removeAttr('data-link-name');
      $learnMoreBtn.removeAttr('data-popup').removeAttr('id').removeClass('active').removeAttr('data-link-name');
      $('.popup_movie_step05 .popup_wrap > div').css('display', 'none');

      if (idx === 0) {
         $('.option_btn').removeClass('active');
         selectedParameters = [];
         selectedParameters.push(_currentOptionValue); // push
      }
      if (!_this.hasClass('active')) {
         _this.addClass('active');
      }
      if (stepCount[idx] !== undefined) {
         stepCount[idx] = $('.answer_btn.active').length;
      } else {
         stepCount.push($('.answer_btn.active').length);
      }
      // console.log('stepCount : ', stepCount);
      // console.log('selectedParameters (배열에 저장된 키/벨류 값) : ', selectedParameters);
      showOptionData();
   }


   /* 데이터 뿌리기 */
   function showOptionData() {
      if ($('.option_btn.active').length > 0) {
         $finderMain.addClass('ready');
         $subContain.addClass('active');

         // 데이터 없는 부분
         // if (idx !== 2 && _selectData[0].DataNon === true) {
         //    $('.que_title').css('display', 'block');
         //    $descHeadWrap.css('display', 'none');
         // }

         // if (idx === 1) {
         //    $descIcon.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.icon + ')');
         //    $descHead.text(_selectData[0].changeData.description);
         // } else if (idx === 2) {
         //    let _currentHtml = configData.htmlData[2]; // 현재 스텝의 항목 데이터
         //    $descIcon.attr('style', 'background-image:url(' + imgPath + _currentHtml[0].changeData.icon + ')');
         //    $descHead.text(_currentHtml[0].changeData.description.head);
         //    $descDetail.text(_currentHtml[0].changeData.description.detail);
         // } else if (idx === 5) {
         //    $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + 'step06/' + selectedProduct[0].class + '_' + _selectData[0].changeData.screenImg + ')');
         //    $descHead.text(_selectData[0].changeData.description);
         // } else {
         //    $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.screenImg + ')');
         //    if (_selectData[0].changeData.description.head !== undefined) {
         //       // 디스크립션 디테일
         //       $descHead.text(_selectData[0].changeData.description.head);
         //       $descDetail.text(_selectData[0].changeData.description.detail);
         //       $loadMoreBtn.addClass('active');
         //       $loadMoreBtn.attr('id', 'descMoreBtn');
         //       _moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, '');
         //       $loadMoreBtn.attr('data-link-name', 'Load More : ' + _moreCont);
         //    } else {
         //       $descHead.text(_selectData[0].changeData.description);
         //       $loadMoreBtn.removeClass('active');
         //       $loadMoreBtn.removeAttr('id');
         //    }
         // }


      } else {
         $finderMain.removeClass('ready');
         $description.css('display', 'none');
         $descDetailWrap.removeClass('open');
         $subContain.removeClass('active');
      }
   }




   /* Event */
   $nextBtn.on('click', moveNextStep);
   $backBtn.on('click', moveBackStep);

   /* Appliance Finder Start */
   stepMovement(idx);
}
function popupSlide() {
   var popupStep05swiper = new Swiper(".popup_step05_slide", {
      pagination: {
         el: ".popup_step05 .indicator",
      },
      observe: true,
      effect: "fade"
   });

   var popupStep03swiperMulti = new Swiper(".popup_step03 .multi", {
      pagination: {
         el: ".popup_step03 .multi .indicator",
      },
      observe: true,
      effect: "fade"
   });

   var popupStep03swiperAmerican = new Swiper(".popup_step03 .american", {
      pagination: {
         el: ".popup_step03 .american .indicator",
      },
      observe: true,
      effect: "fade"
   });

   var popupStep03swiperTall = new Swiper(".popup_step03 .tall", {
      pagination: {
         el: ".popup_step03 .tall .indicator",
      },
      observe: true,
      effect: "fade"
   });

   var popupStep03swiperDouble = new Swiper(".popup_step03 .double", {
      pagination: {
         el: ".popup_step03 .double .indicator",
      },
      observe: true,
      effect: "fade"
   });

   var popupStep03swiperLader = new Swiper(".popup_step03 .lader", {
      pagination: {
         el: ".popup_step03 .lader .indicator",
      },
      observe: true,
      effect: "fade"
   });
} 