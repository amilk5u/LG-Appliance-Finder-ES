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
let interactiveClass; // ??????????????? ?????? class

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
      questionText: 'step01 ???????',
      defaultScreenImg: 'step01/que_img00.png',
      singleOption: true, // ?????? ??????
      option: [
         {
            value: MULTI,
            content: 'Multidoor',
            relevantData: {
               description: 'Caratterizzato dalla grande capacit?? e dagli scompartimenti frigo e congelatore uno sopra l???altro.',
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
               description: 'Ideale se cerchi un modello dalla grande capacit??, ha il frigorifero a destra e il congelatore a sinistra.',
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
               description: 'Il modello di frigorifero a due porte pi?? diffuso in Italia, con frigo nella parte superiore e congelatore in quella inferiore.',
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
               description: 'Ideale se cerchi un modello dalla grande capacit??, ha il frigorifero a destra e il congelatore a sinistra.',
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
      questionText: 'step02 ???????',
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
      questionText: 'step03 ???????',
      relevantData: {
         description: {
            head: 'Come misurare lo spazio che hai a disposizione per un nuovo frigorifero.',
            detail: 'Individua il punto in cui vuoi installare il frigo e prendi le misure dello spazio disponibile. Le porte necessitano dai 25 ai 50mm di spazio per l???apertura e la ventilazione. Sconsigliamo l???installazione vicino a zone molto calde o molto fredde.'
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
      questionText: 'step04 ???????',
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
      questionText: 'step05 ???????',
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      option: [
         {
            value: PURE_N_FRESH,
            content: 'PURE_N_FRESH',
            relevantData: {
               description: 'Goditi dell???acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell???acqua dedicato.',
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
      questionText: 'step06 ???????',
      allSelectOption: true,
      option: [
         { 
            value: ENERGY_GRADE_A,
            content: 'ENERGY_GRADE_A',
            relevantData: {
               description: 'Goditi dell???acqua sempre fresca e ghiaccio a cubetti o tritato, grazie al collegamento diretto a un rubinetto dell???acqua dedicato.',
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
         this.selectedProduct; // ????????? ?????? ????????? 
      }

      /* ?????? ?????? */
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

      /* ????????? ????????? & ?????? */
      setMarkupdate() {
         _currentStructural = Object.values(configData)[idx]; // ?????? ?????? ????????? ??????
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
            let _subKey = Object.keys(_currentStructural.subStep);
            _subStep.forEach(function (subStepItem, subStepIndex) {
               let optionHtml = '';
               if (subStepItem.allSelectOption) {
                  optionHtml += `<button class="all_select" type="button" data-value="${_subKey[subStepIndex]}_${SELECTALL}"><span></span><p>${selectAllContent}</p></button>`;
               }
               subStepItem.option.forEach(function (subOption) {
                  optionHtml += `<button class="option_btn" type="button" data-value="${subOption.value}"><p>${subOption.content}</p></button>`;
               });
               $selectContainer.append(`<li><span>${Object.keys(_currentStructural.subStep)[subStepIndex]}<div><em>${multipleSelectionContent}</em></div> </span><div>${optionHtml}</div></li>`);
            })
         }

         if (_currentStructural.anythingOption) {
            $selectContainer.append(`<li><button class="option_btn anything_btn" type="button" data-value="${ANYTHING}"><i></i><p>${anythingContent}</p></button></li>`)
         }
         if (_currentStructural.allSelectOption) {
            $selectContainer.prepend(`<li><button class="all_select" type="button" data-value="${idx + 1}_${SELECTALL}"><span></span><p>${selectAllContent}</p></button></li>`)
         }
         if (idx === 5) {
            $nextBtn.text(nextLastContent);
         }
      }

      /* ?????? ?????? active & ?????? */
      optionActivation(element) {
         // $('.que_title').css('display', 'block');
         // $description.css('display', 'none');
         let _value = element.data('value');
         let _answerBtnActive = 0; // ?????? active ????????? ????????? (All Select ?????? ??? ????????? ??? ??????)
         let _step2AnswerBtnActive = 1; // step02 ??? acitve ??? ????????? count
         let enabledOptions = 0; // All Select ????????? ????????? ?????? count
         let activeOption = 0; // ?????? ????????? ?????? count 
         // let _AllSelectKeyValue = idx + 1 + '_' + SELECTALL;

         // step 3       
         let step3EnabledOptions = 0; // All Select ????????? ????????? ?????? count
         let step3ActiveOption = 0; // ?????? ????????? ?????? count

         let _AllSelectKeyValue = $('.all_select').data('value');
         let _AllSelectKeyStep3Value = element.parent().find('.all_select').data('value');


         $('.option_btn').each(function () {
            if ($(this).attr('disabled') === undefined) {
               enabledOptions++;
            }
         });
         /* ???????????? ?????? ?????? ??? ????????? ?????? -1 230207 start */
         if ($('.anything_btn').length > 0) {
            enabledOptions--;
         }


         // ?????? ????????? ????????? ????????? & ????????? ????????? push
         if (idx === 0) {
            // button active 
            $('.option_btn').removeClass('active');
            element.addClass('active');
            applianceFinder.filterUpdate(_value, true);
         } else {
            if (!element.hasClass('active')) {
               element.addClass('active');

               /* ???????????? ????????? ?????? ?????? ??? 230207 start */
               if (_value === ANYTHING) {
                  // applianceFinder.stateOptions();
                  // ?????? ??????
                  $('.option_btn').each(function () {
                     let _value = $(this).data('value');

                     if ($(this).attr('disabled') === undefined && !$(this).hasClass('anything_btn')) {
                        $(this).hasClass('anything_btn');
                        $(this).removeClass('active');
                        applianceFinder.filterUpdate(_value, false);
                     }
                  });
                  applianceFinder.filterUpdate(_AllSelectKeyValue, false);
                  $('.all_select').removeClass('active');
               } else {
                  $('.anything_btn').removeClass('active');
                  // applianceFinder.filterUpdate($('.anything_btn').data('value'), false);
               }
               /* ???????????? ????????? ?????? ?????? ??? */
               applianceFinder.filterUpdate(_value, true);
            } else {
               // active ??????
               element.removeClass('active');

               if (idx !== 2) {  //step03 ??????
                  applianceFinder.filterUpdate(_value, false);
                  applianceFinder.filterUpdate(_AllSelectKeyValue, false);
                  $('.all_select').removeClass('active');
               } else {
                  //step03 
                  element.siblings('.all_select').removeClass('active');
                  applianceFinder.filterUpdate(_value, false);
                  applianceFinder.filterUpdate(_AllSelectKeyStep3Value, false);
               }
            }

            if (idx !== 2) {
               // step03 ??????
               /* ???????????? ????????? ?????? ?????? ??? */
               $('.option_btn').each(function () {
                  if ($(this).attr('disabled') === undefined) {
                     if ($(this).hasClass('active') && !$(this).hasClass('anything_btn')) {
                        activeOption++;
                     }
                  }
               });
               /* ???????????? ????????? ?????? ?????? ??? */
               // console.log(activeOption === enabledOptions, activeOption, enabledOptions)
               if (activeOption === enabledOptions) { // active ??? ?????? ????????? ??????????????? ????????? ?????? ??? ??? All Select ?????? acitve 
                  $('.all_select').addClass('active');
                  applianceFinder.filterUpdate(_AllSelectKeyValue, true);
               }
            } else {
               // step03
               let _divBtn = element.parent().find('.option_btn');

               _divBtn.each(function () {
                  if ($(this).attr('disabled') === undefined) { // acitve ??????, disabled ??????, All Select ??? ?????? ????????? kay / value ??? 
                     step3EnabledOptions++;
                  }
               });
               _divBtn.each(function () {
                  if ($(this).attr('disabled') === undefined) {
                     if ($(this).hasClass('active')) {
                        step3ActiveOption++
                     }
                  }
               });

               // active ??? ?????? ????????? ??????????????? ????????? ?????? ??? ??? & ????????? all Select ????????? ?????? ??? ???
               if (step3EnabledOptions === step3ActiveOption && element.parent().find('.all_select').length !== 0) {
                  element.parent().find('.all_select').addClass('active');
                  applianceFinder.filterUpdate(_AllSelectKeyStep3Value, true);
               }
            }
         }
         applianceFinder.optionDataStructure(); // ?????? ?????? ????????? & ?????? ?????? ?????? ??????
      }

      /* ?????? ?????? ?????? active & ?????? */
      allSelectoptionActivation(element) {
         let _step2AnswerBtnActive = 1; // step02 ??? acitve ??? ????????? count
         let _answerBtnActive = 1; // ?????? active ????????? ????????? (All Select ?????? ??? ????????? ??? ??????)

         if (idx !== 2) { // step03 ?????? 
            $('.option_btn').each(function () {
               // active ?????? ?????? ????????? ++
               if ($(this).attr('disabled') === undefined) {
                  _answerBtnActive++
               }
            });

            // ???????????? ????????? ?????? ??? ??? active ?????? ?????? -1
            if ($('.anything_btn').length > 0) {
               _answerBtnActive--;
            }

            // All Select ????????? ?????? ????????? ?????????
            if (!element.hasClass('active')) {
               $('.option_btn').each(function () {
                  // All Select ????????? ????????? active ????????? key / value ??? ?????? ??????
                  if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined) { // acitve ??????, diabled ??????, All Select ??? ?????? ????????? kay / value ???                         
                     if (!$(this).hasClass('anything_btn')) { // ???????????? ????????? ?????? ??? ???????????? push
                        applianceFinder.filterUpdate($(this).data('value'), true);
                     }
                  }
                  if ($(this).attr('disabled') === undefined && !$(this).hasClass('anything_btn')) {
                     $(this).addClass('active');
                     $('.all_select').addClass('active');
                  }
               });
               $('.anything_btn').removeClass('active');
               applianceFinder.filterUpdate($('.all_select').data('value'), true);
               // applianceFinder.filterUpdate($('.anything_btn').data('value'), false); /* ????????????!!!! <----- */
            } else {
               // All Select ?????? ??? ?????? ????????? ??? ?????? & ?????? ??????
               $('.option_btn').removeClass('active');
               $('.all_select').removeClass('active');
               for (let i = 0; i < _answerBtnActive; i++) { // ?????? active ????????? ?????? ????????? ??????
                  this.selectedParameters.splice(-1, 1);
               }
               console.log(this.selectedParameters)
            }
         } else { // step03 
            let _notAllSelectOption = element.siblings(); // AllSelectOption ??? ?????? ????????????

            // step03 ??? acitve ??? ????????? count ++
            _notAllSelectOption.each(function () {
               if ($(this).attr('disabled') === undefined) {
                  _step2AnswerBtnActive++;
               }
            });

            // All Select ????????? ?????? ????????? ?????????
            if (!element.hasClass('active')) {
               element.addClass('active');
               _notAllSelectOption.each(function () {
                  // All Select ????????? ????????? active ????????? key / value ??? ?????? ??????
                  if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined) { // acitve ??????, diabled ??????, All Select ??? ?????? ????????? kay / value ??? 
                     applianceFinder.filterUpdate($(this).data('value'), true);
                  }
                  if ($(this).attr('disabled') === undefined) {
                     $(this).addClass('active');
                  }
               });
            } else {
               // All Select ?????? ??? ?????? ????????? ??? ?????? & ?????? ??????
               element.removeClass('active');
               element.siblings().removeClass('active');
               for (let i = 0; i < _step2AnswerBtnActive; i++) { // ?????? active ????????? ?????? ????????? ??????
                  this.selectedParameters.splice(-1, 1);
               }
            }
         }
      }

      /* ????????? ?????? ?????? */
      stateOptions() {
         // $('.option_btn').each(function () {
         //    console.log('???');
         // });
      }

      /* ?????? ???????????? ?????? & ?????? */
      filterUpdate(_value, _state) {
         if (_state === true) {
            if (idx === 0) {
               this.selectedParameters = []; // selectedParameters ?????????
            }
            if (_value.includes(SELECTALL)) {
               this.selectedParameters.splice(this.selectedParameters.length - 1, 0, _value);
            } else {
               this.selectedParameters.push(_value); // ????????? value push
            }
         }
         if (_state === false) {
            this.selectedParameters = this.selectedParameters.filter(value => {
               return value !== _value;
            });
         }
         console.log(this.selectedParameters)
         // applianceFinder.countingUpdate();
      }

      /* ????????? */
      countingUpdate() {
         // ????????? ?????? push 
         if (this.stepCount[idx] !== undefined) {
            this.stepCount[idx] = $('.option_btn.active').length;
         } else {
            this.stepCount.push($('.option_btn.active').length);
         }
         console.log('stepCount : ', this.stepCount);
      }

      /* ????????? ?????? ?????? ?????? ?????? */
      matchingProductsSave() {
      }

      /* ????????? ?????? ?????? ?????? */
      matchingProductsDelete() {
         $('.que_title').css('display', 'none');
         $description.css('display', 'none');
         $descHeadWrap.css('display', 'block');
         $nextBtn.addClass('active');
         $showNow.addClass('active');
         TweenMax.to($nextBtn, .2, { display: 'block', opacity: 1 });

         // ?????? ???????????? ????????? ?????? ?????? ??? (?????? ?????? ??????) ????????? ??????/????????? ?????? ??????
         if (stepCount[idx + 1] !== undefined || stepCount[idx + 1] === 0) {
            // selectedParameters ?????? ????????? ??????
            for (let i = 0; i < stepCount[stepCount.length - 1]; i++) {
               selectedParameters.pop();
            }
            // ?????? ????????? ??????
            stepCount.pop();
         }

         // ?????? ????????? ????????? ?????? for??? ?????? 
         for (let i = 0; i < stepCount[stepCount.length - 1]; i++) {
            // console.log(selectedParameters[selectedParameters.length - (1 + i)])
            let _selectKey = selectedParameters[selectedParameters.length - (1 + i)].split('=')[0]; // key
            let _selectValue = selectedParameters[selectedParameters.length - (1 + i)].split('=')[1]; // value

            // ?????? value??? ????????? value??? ????????? active 
            $('.option_btn').each(function () {
               let _thisValue = $(this).data('value');
               let _thisKey = $(this).data('key');
               // console.log(_thisKey, _selectKey, _selectValue, _thisValue, _thisKey === _selectKey && _selectValue === _thisValue)
               if (_thisKey === _selectKey && _selectValue === _thisValue) {
                  $(this).addClass('active');
               }
            });
         }
         _lastAnswerValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; //????????? ????????? value ??? ??????
         // sprayData(idx, _currentHtml, _lastAnswerValue); // ????????? ????????? ?????? ????????? ?????????
         // taggingEvent(); // ?????? ??????
      }

      /* ????????? ?????? ?????? ????????? & ???????????? */
      optionDisabled() {
      }

      /* ?????? ?????? ????????? */
      optionDataStructure() {
         $loadMoreBtn.removeClass('active');
         $learnMoreBtn.removeClass('active');
         $learnMoreBtn.removeAttr('data-popup');
         $learnMoreBtn.removeAttr('id');
         $('.popup_movie_step05 .popup_wrap > div').css('display', 'none');
         $loadMoreBtn.removeAttr('data-link-name');
         $learnMoreBtn.removeAttr('data-link-name');

         // ?????? ????????? / ??????????????? ??????, ??????
         if (idx === 2) {
            if ($descDetailWrap.hasClass('open')) {
               $descHeadWrap.css('display', 'none');
            } else {
               $descHeadWrap.css('display', 'block');
            }
         } else {
            $description.css('display', 'none');
            $descHeadWrap.css('display', 'block');
         }

         // ?????? ????????? ??????, ?????? ?????? ??????????????? ?????? / load more ?????? ??????
         if ($('.option_btn.active').length > 0) {
            $('.que_title').css('display', 'none');
            $nextBtn.addClass('active');
            $showNow.addClass('active');

            applianceFinder.sprayData(true);
         } else {
            $('.que_title').css('display', 'block');
            $description.css('display', 'none');
            $descDetailWrap.removeClass('open');
            $nextBtn.removeClass('active');
            $showNow.removeClass('active');
            applianceFinder.sprayData(false);
         }
      }


      // ?????? ?????? ?????? ??????
      sprayData(boolean) {
         let _moreCont;
         let lastValue = this.selectedParameters[this.selectedParameters.length - 1]; // ????????? value ???
         let exposureData;
         if (idx !== 2) {
            let data = _currentStructural.option.filter(item => {
               return item.value === lastValue
            });
            exposureData = data[0];
         } else {
            exposureData = _currentStructural;
         }
         // console.log(exposureData)

         /* ???????????? ?????? ????????? ????????? */
         if (!exposureData) {
            $('.que_title').css('display', 'block');
            $descHeadWrap.css('display', 'none');
         }

         /* ?????? ?????? ????????? ?????? */
         if (boolean && exposureData && exposureData.relevantData) {
            if (exposureData.relevantData.icon) {
               $descIcon.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.icon + ')');
            }
            if (exposureData.relevantData.qnaScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.qnaScreenImg + ')');
            }

            if (exposureData.relevantData.description.head) {
               $descHead.text(exposureData.relevantData.description.head);
               $descDetail.text(exposureData.relevantData.description.detail);
               $loadMoreBtn.addClass('active');
               $loadMoreBtn.attr('id', 'descMoreBtn');
               // _moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, '');
               // $loadMoreBtn.attr('data-link-name', 'Load More : ' + _moreCont);
            } else if (exposureData.relevantData.description) {
               $descHead.text(exposureData.relevantData.description);
            }
            $loadMoreBtn.removeClass('active');
            $loadMoreBtn.removeAttr('id');

            /* ??????????????? & ?????? */
            if (exposureData.relevantData.additionalDesc) {
               $learnMoreBtn.attr('id', 'descMoreBtn');
               $learnMoreBtn.addClass('active');
            }
            if (exposureData.relevantData.interactionPage) {
               $learnMoreBtn.attr('id', 'interactionBtn');
               $learnMoreBtn.addClass('active');
            }
            if (exposureData.relevantData.videoPopup) {
               $learnMoreBtn.attr('id', 'videoMoreBtn');
               $learnMoreBtn.addClass('active');
            }
         }


         if (!boolean) {
            console.log('???????????? ???????????? ????????? ???')
            if (_currentStructural.defaultScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _currentStructural.defaultScreenImg + ')');
            }
            if (idx === 5) {
               // $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + selectedProduct[0].screenImg.lastScreenImg + ')');
            }
         }
      }
   }

   // applianceFinder ?????? ?????????
   const applianceFinder = new Subject();

   applianceFinder.defaultSeting();
   applianceFinder.setMarkupdate();

   /* ?????? ?????? ?????? ????????? */
   $nextBtn.on('click', function () {
      let _lastFinderIndex = Object.values(configData).length - 1;
      if (idx < _lastFinderIndex) {
         idx++;
      }
      applianceFinder.setMarkupdate();
      // applianceFinder.matchingProductsSave();
   });

   /* ?????? ?????? ?????? ????????? */
   $backBtn.on('click', function () {
      if (idx > 0) {
         idx--;
      }
      applianceFinder.setMarkupdate();
      // applianceFinder.matchingProductsDelete();
   });

   /* ?????? ?????? ????????? */
   $(document).on('click', '.option_btn', function () {
      let element = $(this);
      applianceFinder.optionActivation(element);
   });

   /* all Select ?????? ????????? */
   $(document).on('click', '.all_select', function () {
      let element = $(this);
      applianceFinder.allSelectoptionActivation(element);
   });



   $(document).on('click', '#descMoreBtn', function () {
      $descDetailWrap.css('display', 'block');
      $descHeadWrap.css('display', 'none');
      $descDetailWrap.addClass('open');
   });

   $(document).on('click', '#interactionBtn', function () {
      $finderMain.css('display', 'none');
      $('.popup_' + _currentStep).css('display', 'block'); 
      $('.popup_' + _currentStep).removeClass().addClass('popup_' + _currentStep).addClass('popup_step'); // class ?????????
      $('.popup_' + _currentStep).addClass(interactiveClass);
      $(window).scrollTop(headerHeight);
      if (idx === 5) {
         $('.popup_' + _currentStep).find('.txt_wrap img').each(function (i) {
            $(this).attr('src', imgPath + 'step06/' + selectedProduct[0].class + currentStep.productColorImg[i] + '.png');
         });
      }
   });

   // ????????? ?????? ??????
   $(document).on('click', '.caution_open_btn', function () {
      $popupStp3.css('display', 'flex');
      $('.popup_step03 .popup_wrap > div').css('display', 'none');
      $('.popup_step03 .' + selectedProduct[0].class).css('display', 'block');
   });

   // ?????? ?????? ??????
   $(document).on('click', '#videoMoreBtn', function () {
      $('.popup_movie_step05').css('display', 'block');
   });

   // ????????? ??????????????? ??????
   $detailCloseBtn.on('click', function () {
      $descDetailWrap.css('display', 'none');
      $descHeadWrap.css('display', 'block');
      $descDetailWrap.removeClass('open');
   });

   // ????????? / ?????? ?????? ??????
   $popupClose.on('click', function () {
      $(this).parents('.popup_step').css('display', 'none');
      $('.video_wrap').removeClass('play_video');
      $('.popup_movie_step05 .popup_wrap > div').find('video').each(function (i) {
         $('.popup_movie_step05 .popup_wrap > div').find('video')[i].currentTime = 0;
         $('.popup_movie_step05 .popup_wrap > div').find('video')[i].pause();
      });
   });

   // ???????????? ????????? ??????
   $interactionClose.on('click', function () {
      $quickFinder.css('display', 'block');
      $('.popup_step').css('display', 'none');
      $('.popup_' + currentStep.finderStep).removeClass().addClass('popup_' + currentStep.finderStep).addClass('popup_step'); // class ?????????
   });

   $('#selectAgainCloseBtn').on('click', function () {
      $quickFinder.removeClass('not_matched');
   })

   // ????????? ??????????????? ?????? ???????????? ????????????
   $tryAgain.on('click', function () {
      location.href = currentUrl.split('?')[0] + '?intro=no';
   });

   // ?????? ?????? ??????
   $('.video_btn').on('click', function () {
      let _this = $(this);
      if (!_this.parents('.video_wrap').hasClass('play_video')) {
         _this.parents('.video_wrap').addClass('play_video');
         _this.parents('.video_wrap').find('video').get(0).play();
      }
   });

   // ?????? ?????? ??????
   $('.video_wrap i').on('click', function () {
      let _this = $(this);
      if (_this.parents('.video_wrap').hasClass('play_video')) {
         _this.parents('.video_wrap').removeClass('play_video');
         _this.parents('.video_wrap').find('video').get(0).pause();
      }
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