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