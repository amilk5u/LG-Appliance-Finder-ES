"use strict";
/* Element */
const $applianceFinder = $('#applianceFinder'),
   $finderMain = $applianceFinder.find('#finderMain'),
   $selectWrap = $applianceFinder.find('#selectWrap'),
   $selectContainer = $applianceFinder.find('#selectWrap ol'),
   $selectButton = $applianceFinder.find('#selectWrap ol li'),
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
   $subContain = $applianceFinder.find('.sub_contain'),
   $queTitle = $applianceFinder.find('.que_title');
   

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

/* Not Data */
const NOTDATA = 'NOTDATA';

/* Text */
const multipleSelectionContent = 'Scegli tutte le opzioni che vuoi.';
const selectAllContent = 'Tutte le opzioni';
const anythingContent = 'Non ho particolari esigenze, </br>fammi vedere tutti i modelli.';
const nextContent = 'AVANTI';
const nextLastContent = 'Abbiamo quasi finito!';

let idx = 0;
let imgPath;
let stageIdx;
let stageDesc;
let stageCont;
let headerHeight = $('header').outerHeight();

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
      singleOption: true, // 단일 옵션
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
      allSelectOption: true,
      option: [
         {
            value: CAPACITY_UNDER_400L,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: NOTDATA,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_SPACE_400L_500L,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_SPACE_500L_600L,
            content: 'step02 content2',
            relevantData: {
               description: 'La scelta più pratica se hai poco spazio a disposizione oppure se fai la spesa al supermercato più volte alla settimana.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_600L_OR_MORE,
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
         depth: {
            option: [
               {
                  value: DEPTH_UNDER_760MM,
                  content: 'step03-1 content1',
               },
               {
                  value: NOTDATA,
                  content: 'step03-1 content2',
               },
            ],
         },
         width: {
            allSelectOption: true,
            option: [
               {
                  value: WIDTH_SPANCE_610MM_800MM,
                  content: 'step03-2 content1',
               },
               {
                  value: WIDTH_SPANCE_810MM_900MM,
                  content: 'step03-2 content2',
               },
               {
                  value: WIDTH_SPANCE_910MM_OR_MORE,
                  content: 'step03-2 content3',
               },
            ],
         },
         height: {
            allSelectOption: true,
            option: [
               {
                  value: HEIGHT_UNDER_1800MM,
                  content: 'step03-3 content1',
               },
               {
                  value: HEIGHT_SPANCE_1800MM_2000MM,
                  content: 'step03-3 content2',
               },
               {
                  value: HEIGHT_2000L_OR_MORE,
                  content: 'step03-3 content3',
               },
            ],
         },

      }
   },
   step04: {
      questionText: 'step04 질문?',
      defaultScreenImg: 'step02/que_img00.png',
      allSelectOption: true,
      anythingOption: true,
      option: [
         {
            value: PLUMBED,
            content: 'Con allacciamento idrico',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
            }
         },
         {
            value: WATER_ONLY,
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
            value: NON_PLUMBED,
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
      allSelectOption: true,
      option: [
         {
            value: PURE_N_FRESH,
            content: 'Con allacciamento idrico',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
            }
         },
         {
            value: INSTAVIEW,
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
            value: THINKQ,
            content: 'Senza allacciamento idrico </br>(solo acqua)',
            DataNon: true,
         },
      ]
   },
   step06: {
      questionText: 'step06 질문?',
      defaultScreenImg: 'step02/que_img00.png',
      allSelectOption: true,
      option: [
         {
            value: ENERGY_GRADE_A,
            content: 'Con allacciamento idrico',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
            }
         },
         {
            value: STAINLESS,
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
            value: SILVER,
            content: 'Senza allacciamento idrico </br>(solo acqua)',
            relevantData: {
               description: {
                  head: 'Goditi dell’acqua sempre fresca tutte le volte che vuoi.',
                  detail: 'Una soluzione pratica per avere sempre pronta dell’acqua fresca grazie alla tanica interna al frigorifero.'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
         {
            value: ENERGY_GRADE_B,
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
   let _currentStructural;
   let _currentStep;
   let _questionText;
   let _defaultScreenImg;

   class Subject {
      constructor() {
         this.selectedParameters = []; // Filter Push 
         this.stepCount = []; // Acitve Count
      }

      /* 초기 세팅 */
      defaultSeting() {
         let resultPageUrl;
         let stageLiveDecide;
         let currentUrl = document.location.href;
         currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;
         if (stageLiveDecide) {
            resultPageUrl = './risultati-della-ricerca';
         } else {
            resultPageUrl = 'https://wwwstg.lg.com/it/frigoriferi/risultati-della-ricerca';
         }
         let desktopWidthOrHigher = window.innerWidth >= 1024;
         let introJsonPath;
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
               // $(window).scrollTop(headerHeight);
            });
         }
      }

      /* 마크업 초기화 & 생성 */
      setMarkupdate() {
         _currentStructural = Object.values(configData)[idx]; // 현재 스텝 마크업 구조
         _currentStep = Object.keys(configData)[idx];
         _questionText = _currentStructural.questionText;
         _defaultScreenImg = _currentStructural.defaultScreenImg;

         $finderMain.removeClass().addClass(_currentStep);
         $(window).scrollTop(headerHeight);
         $queTitle.empty().text(_questionText);
         $descHeadWrap.find('strong').text(_questionText);
         $selectContainer.empty();
         $nextBtn.attr('data-link-name', nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
         // $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _defaultScreenImg + ')');

         let _currentoption = _currentStructural.option;
         if (_currentStructural.subStep === undefined) {
            _currentoption.forEach(function (option) {
               $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${option.value}"><i></i><p>${option.content}</p></button></li>`);
               if (option.value === NOTDATA) {
                  $selectContainer.find('li').last().find('button').prop('disabled', true);
               }
            });
         } else {
            let _subStep = Object.values(_currentStructural.subStep);
            _subStep.forEach(function (subStepItem, subStepIndex) {
               let optionHtml = '';
               if (subStepItem.allSelectOption) {
                  optionHtml += `<button class="all_select" type="button" data-key="${SELECTALL}" data-value=""><span></span><p>${selectAllContent}</p></button>`;
               }
               subStepItem.option.forEach(function (subOption) {
                  optionHtml += `<button class="option_btn" type="button" data-key="${subOption.value}" data-value=""><p>${subOption.content}</p></button>`;
               });
               $selectContainer.append(`<li><span>${Object.keys(_currentStructural.subStep)[subStepIndex]}<div><em>${multipleSelectionContent}</em></div> </span><div>${optionHtml}</div></li>`);
            })
         }

         if (_currentStructural.anythingOption) {
            $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${ANYTHING}"><i></i><p>${anythingContent}</p></button></li>`)
         }
         if (_currentStructural.allSelectOption) {
            $selectContainer.prepend(`<li><button class="all_select" type="button" data-value="${SELECTALL}"><span></span><p>${selectAllContent}</p></button></li>`)
         }
         if (idx === 5) {
            $nextBtn.text(nextLastContent);
         }
      }

      /* 선택 옵션 active & 해제 */
      // optionActivation(_item) {
      //    let _value = _item.data('value');
      //    let _active;
      //    let _optionArray;

      //    if (_currentStructural.singleOption) {
      //       $('.option_btn').removeClass('active');
      //    }
      //    if (!_item.hasClass('active')) {
      //       _item.addClass('active');
      //       _active = true;
      //       if (_value === ANYTHING) {
      //          _optionArray = applianceFinder.stateOptions(_value, _active);
      //          _optionArray.forEach(function (element) {
      //             element.removeClass('active');
      //          });
      //       } else {
      //          _optionArray = applianceFinder.stateOptions(_value, _active);
      //          _optionArray.forEach(function (element) {
      //             element.removeClass('active');
      //          });
      //       }
      //    } else {
      //       _item.removeClass('active');
      //       _active = false;
      //       applianceFinder.stateOptions(_value, _active);
      //    }

      //    applianceFinder.filterUpdate(_value, _active, _optionArray);
      // }

      // /* 전체 선택 옵션 active & 해제 */
      // allSelectoptionActivation(_item) {
      //    let _active;
      //    let _optionArray;

      //    if (!_item.hasClass('active')) {
      //       _active = true;
      //       _item.addClass('active');
      //       _optionArray = applianceFinder.stateOptions(SELECTALL, _active);
      //       _optionArray.forEach(function (element) {
      //          element.addClass('active');
      //       });
      //    } else {
      //       _active = false;
      //       _item.removeClass('active');
      //       _optionArray = applianceFinder.stateOptions(SELECTALL, _active);
      //       _optionArray.forEach(function (element) {
      //          element.removeClass('active');
      //       });
      //    }
      //    applianceFinder.filterUpdate(SELECTALL, _active, _optionArray);
      // }

      // /* 옵션 선택후 옵션의 상태 판단 */
      // stateOptions(_value, _active) {
      //    let _optionArray = [];
      //    let enabledOptions = 0; // 활성화된 옵션 갯수
      //    let activeOption = 0; // acitve 된 옵션 갯수

      //    $('.option_btn').each(function () {
      //       let _this = $(this);
      //       if (_active) {
      //          if (_value === SELECTALL) {
      //             if (!_this.hasClass('active') && _this.data('value') !== ANYTHING && _this.attr('disabled') === undefined) {
      //                _optionArray.push(_this);
      //                activeOption++;
      //             }
      //          } else if (_value === ANYTHING) {
      //             if (_this.hasClass('active') && _this.data('value') !== ANYTHING) {
      //                _optionArray.push(_this);
      //             }
      //          } else {
      //             if (_this.data('value') === ANYTHING) {
      //                _optionArray.push(_this);
      //             }
      //          }
      //       } else {
      //          if (_value === SELECTALL) {
      //             if (_this.attr('disabled') === undefined && _this.data('value') !== ANYTHING) {
      //                activeOption--;
      //                _optionArray.push(_this);
      //             }
      //          }
      //       }

      //       // active 된 옵션 갯수 카운팅
      //       if (_this.hasClass('active')) {
      //          activeOption++;
      //       }
      //       // 활성화된 옵션 갯수 카운팅
      //       if (_this.data('value') !== ANYTHING && _this.attr('disabled') === undefined) {
      //          enabledOptions++;
      //       }
      //    });



      //    /* All Select 예외 처리 */
      //    console.log(activeOption === enabledOptions, activeOption, enabledOptions)
      //    if (activeOption === enabledOptions) {
      //       $('.all_select').addClass('active');
      //       this.selectedParameters.push(SELECTALL);
      //    } else {
      //       $('.all_select').removeClass('active');
      //       this.selectedParameters = this.selectedParameters.filter(function (element) {
      //          return element !== SELECTALL
      //       });
      //    }
      //    return _optionArray;
      // }

      // /* 필터 업데이트 추가 & 삭제 */
      // filterUpdate(_value, _active, _optionArray) {
      //    if (_currentStructural.singleOption) {
      //       this.selectedParameters = [];
      //    }
      //    if (_active) {
      //       // 선택 값 추가
      //       if (_value === SELECTALL) {
      //          for (let i = 0; i < _optionArray.length; i++) {
      //             this.selectedParameters.push(_optionArray[i].data('value'));
      //          }
      //       }
      //       if (_value === ANYTHING) {
      //          for (let i = 0; i < _optionArray.length; i++) { // 버튼 active 카운팅 만큼 반복문 실행
      //             this.selectedParameters.splice(-1, 1);
      //          }
      //       } else {
      //          this.selectedParameters = this.selectedParameters.filter(function (element) {
      //             return element !== ANYTHING
      //          });
      //       }
      //       // this.selectedParameters.push(_value);
      //    } else {
      //       // 선택 해제 값 삭제
      //       this.selectedParameters = this.selectedParameters.filter(function (element) {
      //          return element !== _value
      //       });
      //       if (_value === SELECTALL) {
      //          for (let i = 0; i < _optionArray.length; i++) { // 버튼 active 카운팅 만큼 반복문 실행
      //             this.selectedParameters.splice(-1, 1);
      //          }
      //       }
      //    }
      //    console.log(this.selectedParameters);
      // }



      /* 카운팅 */
      countingUpdate() {

      }

      /* 선택한 필터 제품 매칭 저장 */
      MatchingProducts() {

      }
      /* 선택한 필터 제품 삭제 */
      MatchingProductsDelete() {

      }

      /* 매칭된 제품 버튼 활성화 & 비활성화 */
      optionDisabled() {

      }

      // getObserverList() {
      //    return this.observers;
      // }
      // subscribe(observer) {
      //    this.observers.push(observer);
      // }
      // unsubscribe(observer) {
      //    console.log(this.observers)
      //    this.observers = this.observers.filter((obs) => function () {
      //       obs !== observer
      //    });
      // }
      // notifyAll() {
      //    this.observers.forEach((subscriber) => {
      //       try {
      //          subscriber.update(this.constructor.name);
      //       } catch (error) {
      //          console.log(error);
      //       }
      //    });
      //    console.log('complete : ', this.observers);
      // }
   }

   // class Observer {
   //    constructor(name) {
   //       this.name = name;
   //    }
   //    update(subj) {
   //       console.log(`${this.name}`);
   //    }
   // }

   //주제 객체 만들기
   const applianceFinder = new Subject();
   // 옵저버 만들기
   // const Observer1 = new Observer("1번 구독자");
   // const Observer2 = new Observer("2번 구독자");
   // const Observer3 = new Observer("3번 구독자");


   // 구독하기
   // $(".resister").on("click", function () {
   //    // applianceFinder.subscribe(Observer2);
   //    // applianceFinder.notifyAll();
   //    // applianceFinder.getObserverList();
   // });
   // 구독자 정보 확인하기

   // 알림보내기
   // subj.notifyAll(); // 구독해지
   // $(".delete").on("click", function () {
   //    applianceFinder.unsubscribe(Observer2);
   //    applianceFinder.notifyAll();
   //    applianceFinder.getObserverList();
   // });

   applianceFinder.defaultSeting();
   applianceFinder.setMarkupdate();

   /* 다음 스텝 클릭 이벤트 */
   $nextBtn.on('click', function () {
      let _lastFinderIndex = Object.values(configData).length - 1;
      if (idx < _lastFinderIndex) {
         idx++;
      }
      applianceFinder.setMarkupdate();
   });

   /* 이전 스텝 클릭 이벤트 */
   $backBtn.on('click', function () {
      if (idx > 0) {
         idx--;
      }
      applianceFinder.setMarkupdate();
   });

   /* 옵션 클릭 이벤트 */
   $(document).on('click', '.option_btn', function () {
      let _item = $(this);
      applianceFinder.optionActivation(_item);
   });

   /* all Select 클릭 이벤트 */
   $(document).on('click', '.all_select', function () {
      let _item = $(this);
      applianceFinder.allSelectoptionActivation(_item);
   });

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