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
let interactiveClass; // 인터렉티브 매칭 class

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
               interactionPage: 'multi',
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
               interactionPage: 'american',

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
               interactionPage: 'tall',
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
               interactionPage: 'american',
            },
            saveImg: {
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step06/multi_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: LADER,
            content: 'Maxi Side-by-Side componibile',
            relevantData: {
               description: 'La soluzione ideale se desideri frigorifero e congelatore separati.',
               qnaScreenImg: 'step01/que_img05.png',
               interactionPage: 'lader',
            },
            saveImg: {
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step06/multi_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
      ]
   },
   step02: {
      questionText: 'step02 질문?',
      allSelectOption: true,
      option: [
         {
            value: CAPACITY_UNDER_400L,
            content: 'step02 content1',
            relevantData: {
               description: 'step02 description 1',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: NOTDATA,
            content: 'step02 content2',
            relevantData: {
               description: 'step02 description 2',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_SPACE_400L_500L,
            content: 'step02 content3',
            relevantData: {
               description: 'step02 description 3',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_SPACE_500L_600L,
            content: 'step02 content4',
            relevantData: {
               description: 'step02 description 4',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: CAPACITY_600L_OR_MORE,
            content: 'step02 content5',
            relevantData: {
               description: 'step02 description 5',
               icon: 'step02/disc_icon01.png',
            }
         },
      ]
   },
   step03: {
      questionText: 'step03 질문?',
      relevantData: {
         description: {
            head: 'Come misurare lo spazio che hai a disposizione per un nuovo frigorifero.',
            detail: 'Individua il punto in cui vuoi installare il frigo e prendi le misure dello spazio disponibile. Le porte necessitano dai 25 ai 50mm di spazio per l’apertura e la ventilazione. Sconsigliamo l’installazione vicino a zone molto calde o molto fredde.'
         },
         additionalDesc: true,
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
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      anythingOption: true,
      option: [
         {
            value: PLUMBED,
            content: 'PLUMBED',
            relevantData: {
               description: 'PLUMBED',
               qnaScreenImg: 'step04/que_img02.png',
               videoPopup: true,
            },
         },
         {
            value: WATER_ONLY,
            content: 'WATER_ONLY',
            relevantData: {
               description: {
                  head: 'WATER_ONLY head',
                  detail: 'WATER_ONLY detail'
               },
               qnaScreenImg: 'step04/que_img03.png',
               videoPopup: true,
            },
         },
         {
            value: NON_PLUMBED,
            content: 'NON_PLUMBED',
            relevantData: {
               description: {
                  head: 'NON_PLUMBED head',
                  detail: 'NON_PLUMBED detail'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
   step05: {
      questionText: 'step05 질문?',
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      option: [
         {
            value: PURE_N_FRESH,
            content: 'PURE_N_FRESH',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
               videoPopup: 'smart_ai_features',
            }
         },
         {
            value: INSTAVIEW,
            content: 'INSTAVIEW',
            relevantData: {
               description: {
                  head: 'INSTAVIEW head',
                  detail: 'INSTAVIEW detail'
               },
               videoPopup: 'smart_ai_features',
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
      allSelectOption: true,
      option: [
         { 
            value: ENERGY_GRADE_A,
            content: 'ENERGY_GRADE_A',
            relevantData: {
               description: 'Goditi dell’acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell’acqua dedicato.',
               qnaScreenImg: 'step04/que_img02.png',
               interactionPage: 'silver',
            }
         },
         {
            value: STAINLESS,
            content: 'STAINLESS',
            relevantData: {
               description: {
                  head: 'STAINLESS head',
                  detail: 'STAINLESS detail'
               },
               interactionPage: 'silver',
               qnaScreenImg: 'step04/que_img03.png',

            }
         },
         {
            value: SILVER,
            content: 'SILVER',
            relevantData: {
               description: {
                  head: 'SILVER',
                  detail: 'SILVER 1'
               },
               interactionPage: 'silver',
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
         {
            value: ENERGY_GRADE_B,
            content: 'ENERGY_GRADE_B',
            relevantData: {
               description: {
                  head: 'ENERGY_GRADE_B',
                  detail: 'ENERGY_GRADE_B 1`'
               },
               interactionPage: 'silver',
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
}


popupSlide();
main();