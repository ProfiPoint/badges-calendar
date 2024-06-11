const username = getParameterByName('username');
const uid = getParameterByName('uid');
const labOnly = getParameterByName('labOnly');
const mainUrl = window.location.href.split('#')[0];
var urlYM = window.location.href.split('#')[1];

if (urlYM) {
    const splitYM = urlYM.replace("-",",").split(",");
    urlYM = parseInt(splitYM[1]) + "," + splitYM[0];
}

startDate = new Date(); 
currentDate = new Date();
allDaysInBetween = {};
calendarMonths = {};
allBadgesData = {};
allBadgeIcons = []

calendarMonthsINDEX = 0;
badgesThisMonth = 0;
badgesLoaded = false;

monthIndex = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
}

dayIndexR = {
    "Mon" : 1,
    "Tue" : 2,
    "Wed" : 3,
    "Thu" : 4,
    "Fri" : 5,
    "Sat" : 6,
    "Sun" : 7,
}

dayIndexW = {
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday",
    7 : "Sunday",
}

labBadges = [1319774652,1319775539,1319776909,1319781074,1319781637,1319782031,1319782509,1319784520,1319806446,1319807820,1319809474,1319810666,1319811527,1319812690,1319960753,1319961226,1319962459,1319976215,1319981135,1319989829,1320072251,1320086259,1320965045,1320972450,1321004752,1321005233,1321005730,1321008604,1321008936,1379842585,1379843067,1379843475,1379844932,1379846628,1379847572,1379848300,1379849074,1379849697,1379850559,1379851111,1379851912,1379852502,2124444575,2126861107]

spaceBadges = [2124468852,2124468853,2124468855,2124468857,2124468858,2124468859,2124468860,2124468861,2124468862,2124468863,2124468864,2124468865,2124468866,2124468867,2124468868,2124468869,2124468870,2124468871,2124468872,2124468873,2124468874,2124468875,2124468876,2124468877,2124468878,2124468879,2124468880,2124468881,2124468882,2124468883,2124468884,2124468885,2124468886,2124468887,2124468888,2124468889,2124468890,2124468891,2124468892,2124468893,2124468894,2124468895,2124468896,2124468897,2124468898,2124474196,2124474197,2124474198,2124474199,2124474200,2124474201,2124474202,2124474203,2124474204,2124474205,2124474206,2124474207,2124474209,2124474211,2124478491]

dungeonBadges = [794155999,794156621,794158126,794158967,794158967,794159913,794160666,794161330,794162123,794162868,794163933,794164999,794165679,794166664,794167564,794168388,794169143,794170322,794170969,794171716,794172416,794173252,794174017,794174986,794176790,794177487,794178817,794179582,794180575,794181339,794182164,794183021,794183820,794184557]

olympiaBadges = [2124661633,2124661634,2124661635,2124661637]

brickBadges = [2124563423]

potionBadges = [2124454508]

colorBadges = [2124677275,2124677276,2124677277,2124677279,2124678851,2124678852,2124678853,2124678854,2124678855,2124678856,2124679266,2124681072,2124681073,2124681074,2124681075]

buttonBadges = [2124508106,2124508105,2124508031,2124508005,2124508004,2124508003,2124508001,2124508000,2124507999,2124507998]

catBadges = [2124492002]

gemBadges = [2124619422,2124619423,2124619424,2124619425,2124619427,2124619428,2124641148,2124641152,2124641153]

thiefBadges = [2124422917,2124422918,2124422919,2124422920,2124422921,2124422922,2124422923,2124422924,2124422925,2124422926,2124422927,
2124422928,2124422929,2124422930,2124422931,2124422932,2124422933,2124422934,2124422935,2124422936,2124422937,
2124422938,2124422939,2124422940,2124422941,2124422942,2124422943,2124422944,2124422945,2124422946,2124422947,
2124422948,2124422949,2124422950,2124422951,2124422952,2124422953,2124422954,2124422955,2124424929,2124424931,
2124424932]

sharkybyteBadges = []

for (var games of [labBadges, spaceBadges, dungeonBadges, olympiaBadges, brickBadges, potionBadges, colorBadges, buttonBadges, catBadges, gemBadges, thiefBadges]) {
    for (var badge of games) {
        sharkybyteBadges.push(badge)
    }
}

badgeUploadedIcons = [100476680, 1011040086, 1011041448, 1011041607, 1033790716, 1062932748, 1071231194, 1074079430, 1074782946, 1084331673, 1085631773, 1088702771, 1088861250, 1088861384, 1088861474, 1088861602, 1088861694, 1099043459, 1099043804, 1099043972, 1099044160, 1099044331, 1111117340, 1111117465, 1111117583, 1111117684, 1111117782, 1111117872, 1121835952, 1121841984, 1121851828, 1121852060, 1121917397, 1122929764, 1123347028, 1123401015, 1123428746, 1123428885, 1123429022, 1123429163, 1123429350, 1123524853, 1125713869, 1125714124, 1125714272, 1125714545, 1126004668, 1126461053, 1126678088, 1126678250, 1127116640, 1129343311, 1129343671, 1129343848, 1129353781, 1130548215, 1130548489, 1131031453, 1131150381, 1132406861, 1132407194, 1133149927, 1134082980, 1134249246, 1134467023, 1135065916, 1137178838, 1137179505, 1137180058, 1137180510, 1137180831, 1137198884, 1141057672, 1155402780, 1155402930, 1155403070, 1155403205, 1155403372, 116015925, 1161352872, 1180669038, 1180669236, 1180669389, 1180669518, 1180669687, 1194020315, 120011112, 120011653, 1201946402, 1224382609, 1224382760, 1224382866, 1224383013, 1224383180, 1253650991, 1253652113, 1253652505, 1253653291, 1253654416, 1253654867, 1253655473, 1253656170, 1253657977, 1253658560, 1262891580, 1272065933, 1272066125, 1272066269, 1272066462, 1272066622, 1298232561, 1304097518, 1311390305, 1314082793, 1319774652, 1319775539, 1319776909, 1319781074, 1319781637, 1319782031, 1319782509, 1319784520, 1319806446, 1319807820, 1319809474, 1319810666, 1319811527, 1319812690, 1319960753, 1319961226, 1319962459, 1319976215, 1319981135, 1319989829, 1320072251, 1320086259, 1320965045, 1320972450, 1321004752, 1321005233, 1321005730, 1321008604, 1321008936, 132919329, 132919527, 132919752, 1332140774, 1332143921, 1332145111, 1332148714, 1332151802, 1332317237, 1333207359, 1335892464, 1351308251, 1366156650, 1366156945, 1366157269, 1366157550, 1366157914, 1366905994, 1366906755, 1375282123, 1375282559, 1375283056, 1379842585, 1379843067, 1379843475, 1379844932, 1379846628, 1379847572, 1379848300, 1379849074, 1379849697, 1379850559, 1379851111, 1379851912, 1379852502, 138109144, 138109160, 1405325383, 1405584290, 140887535, 140889503, 1425180483, 1425278630, 1440920431, 1441803788, 1445340970, 1458868369, 1458869069, 1458869603, 1458870075, 1458870646, 1458871253, 1458871580, 1458872028, 1458872484, 1458872854, 1458873331, 147576189, 1484125079, 1484125312, 1485498282, 149636999, 1501882923, 1507524167, 1512533056, 1512533433, 1523822849, 1542578549, 1542581029, 1543254626, 1556765011, 157629103, 157629209, 157629341, 157629408, 157629475, 157629559, 157629625, 157629680, 157629819, 157629867, 157629918, 157629997, 157633977, 157634044, 157634151, 157634240, 157634296, 157634363, 1585594799, 1585613445, 158709493, 159693662, 159694014, 159694180, 159694473, 159694576, 159694745, 159694860, 159695076, 159695331, 1627277012, 162736595, 162736671, 163496287, 163496491, 1645377230, 164884816, 1659112045, 1673469216, 1674656255, 1676989819, 1677013230, 1689911942, 171382390, 171656487, 1745311979, 1745312528, 1745312931, 1745313326, 1745314455, 174555375, 174555962, 174605507, 174605653, 174605742, 174605895, 174605966, 174606018, 174606278, 174606652, 174606749, 174606817, 174606991, 174607051, 174607152, 174607387, 174607466, 174607542, 174607692, 1748689519, 1748695654, 1748696740, 1748771399, 175195799, 176685508, 176685667, 176685798, 176685910, 176685982, 176686088, 1767178626, 1771959480, 177743494, 177743741, 1777660772, 1789084895, 180137774, 1803034442, 182885296, 1865509314, 1865509600, 1866050915, 1867781859, 1874298577, 188176433, 189799329, 189799683, 189799987, 189800459, 1899007243, 1903363740, 1940956352, 196198137, 196704167, 1973865235, 1973874666, 198196955, 2006489813, 2059460090, 2061531650, 2070769694, 2090219929, 2090220978, 2090221760, 2107257028, 2107258101, 2107259230, 2107260030, 2107264866, 2107265627, 2112663886, 2115289487, 2115290495, 2124421183, 2124422075, 2124422246, 2124422917, 2124422919, 2124422920, 2124422921, 2124422922, 2124422923, 2124422925, 2124422926, 2124422927, 2124422928, 2124422929, 2124422936, 2124422937, 2124422938, 2124422939, 2124422940, 2124422941, 2124422942, 2124422943, 2124422944, 2124422945, 2124422947, 2124422951, 2124423280, 2124423929, 2124424129, 2124424672, 2124424814, 2124424929, 2124425041, 2124425042, 2124425043, 2124425214, 2124425332, 2124425489, 2124425490, 2124425491, 2124425516, 2124425540, 2124425541, 2124425589, 2124425590, 2124425611, 2124425882, 2124426045, 2124426046, 2124426047, 2124426048, 2124426049, 2124426627, 2124426890, 2124427204, 2124427338, 2124427832, 2124427995, 2124428182, 2124428183, 2124428184, 2124428185, 2124428186, 2124428509, 2124428543, 2124428580, 2124428593, 2124428683, 2124428687, 2124428729, 2124428817, 2124438802, 2124439132, 2124439134, 2124439135, 2124439152, 2124439675, 2124439678, 2124439682, 2124439702, 2124440137, 2124440275, 2124440410, 2124441237, 2124441402, 2124441593, 2124441724, 2124441942, 2124441943, 2124441944, 2124441945, 2124441946, 2124441947, 2124441960, 2124442589, 2124442590, 2124443042, 2124443325, 2124443561, 2124443794, 2124443925, 2124443926, 2124443929, 2124443934, 2124443941, 2124443950, 2124443956, 2124444575, 2124444629, 2124444673, 2124444711, 2124444712, 2124444713, 2124444726, 2124445045, 2124445058, 2124445122, 2124445126, 2124445173, 2124445197, 2124445199, 2124445208, 2124445217, 2124445628, 2124445667, 2124445748, 2124449303, 2124449357, 2124450034, 2124450223, 2124450954, 2124451041, 2124451042, 2124451045, 2124451046, 2124451047, 2124451048, 2124451050, 2124451051, 2124451052, 2124451054, 2124451056, 2124451061, 2124451062, 2124451063, 2124451068, 2124451069, 2124451073, 2124451074, 2124451075, 2124451077, 2124451087, 2124451088, 2124451091, 2124451095, 2124451099, 2124451100, 2124451104, 2124451105, 2124451107, 2124451126, 2124451194, 2124451209, 2124451382, 2124451945, 2124451967, 2124452084, 2124452132, 2124452133, 2124452181, 2124452307, 2124452536, 2124452660, 2124452715, 2124452716, 2124452717, 2124452718, 2124453196, 2124454471, 2124454508, 2124454509, 2124454762, 2124455534, 2124455644, 2124456283, 2124456328, 2124456329, 2124456950, 2124457332, 2124457466, 2124457501, 2124457503, 2124457509, 2124457649, 2124457698, 2124457874, 2124457875, 2124457878, 2124457879, 2124457881, 2124458076, 2124458077, 2124458751, 2124459191, 2124459195, 2124459198, 2124459211, 2124459216, 2124459278, 2124459280, 2124459313, 2124459711, 2124460051, 2124460084, 2124460085, 2124460187, 2124460288, 2124460462, 2124460519, 2124460694, 2124461106, 2124461422, 2124461423, 2124461424, 2124461556, 2124461558, 2124461816, 2124461838, 2124461839, 2124461840, 2124461841, 2124461842, 2124461843, 2124461943, 2124462080, 2124462287, 2124462289, 2124462322, 2124462323, 2124462361, 2124463427, 2124463441, 2124464557, 2124464563, 2124464656, 2124465312, 2124465442, 2124465990, 2124465991, 2124465992, 2124465994, 2124465995, 2124465996, 2124465997, 2124465999, 2124466000, 2124466001, 2124466002, 2124466336, 2124468852, 2124468853, 2124468855, 2124468857, 2124468858, 2124468860, 2124468861, 2124468862, 2124468863, 2124468867, 2124468868, 2124468869, 2124468870, 2124468874, 2124468875, 2124468876, 2124468877, 2124468878, 2124468880, 2124468881, 2124468882, 2124468883, 2124468885, 2124468886, 2124468887, 2124468888, 2124468889, 2124468890, 2124468891, 2124468892, 2124468893, 2124468894, 2124468895, 2124468896, 2124468897, 2124468898, 2124468919, 2124468920, 2124468921, 2124469732, 2124470143, 2124470456, 2124470457, 2124470796, 2124471319, 2124471808, 2124471831, 2124472398, 2124472492, 2124472493, 2124472586, 2124472587, 2124472759, 2124472760, 2124473160, 2124473208, 2124473411, 2124473786, 2124473792, 2124473926, 2124473927, 2124473928, 2124473930, 2124473931, 2124474136, 2124474196, 2124474197, 2124474200, 2124474201, 2124474202, 2124474203, 2124474207, 2124474209, 2124474211, 2124474235, 2124474327, 2124474328, 2124474491, 2124474495, 2124474524, 2124474525, 2124474919, 2124475167, 2124475168, 2124475169, 2124475255, 2124475256, 2124475647, 2124475816, 2124475833, 2124476833, 2124477336, 2124477337, 2124477339, 2124477834, 2124477835, 2124477836, 2124477837, 2124477838, 2124478288, 2124478718, 2124479147, 2124479352, 2124479695, 2124479696, 2124479698, 2124480285, 2124480286, 2124480333, 2124480843, 2124481063, 2124481339, 2124481494, 2124481701, 2124482468, 2124482469, 2124482471, 2124484519, 2124485629, 2124485633, 2124485765, 2124486717, 2124486721, 2124486722, 2124487074, 2124489438, 2124489439, 2124489440, 2124489441, 2124489442, 2124490216, 2124490283, 2124490285, 2124490286, 2124490287, 2124490295, 2124490296, 2124491042, 2124491078, 2124491079, 2124491515, 2124492002, 2124492819, 2124493342, 2124500505, 2124500540, 2124500995, 2124502079, 2124505546, 2124505884, 2124505963, 2124506896, 2124507049, 2124507999, 2124508000, 2124508001, 2124508003, 2124508106, 2124508451, 2124511113, 2124512647, 2124513436, 2124513439, 2124513440, 2124513441, 2124513442, 2124513443, 2124513444, 2124513445, 2124513446, 2124513447, 2124513448, 2124513449, 2124513450, 2124513451, 2124513452, 2124513453, 2124513454, 2124513455, 2124513456, 2124513460, 2124513475, 2124513632, 2124514030, 2124514031, 2124514032, 2124514033, 2124514034, 2124514086, 2124514457, 2124514458, 2124514459, 2124514460, 2124514461, 2124514811, 2124514816, 2124515038, 2124515138, 2124515150, 2124515151, 2124515741, 2124515762, 2124516306, 2124516307, 2124516308, 2124516309, 2124516310, 2124516762, 2124516763, 2124516771, 2124518317, 2124518479, 2124518483, 2124518491, 2124518525, 2124518565, 2124518569, 2124518571, 2124518590, 2124518597, 2124518636, 2124518692, 2124518695, 2124518819, 2124518888, 2124518922, 2124519136, 2124520191, 2124520252, 2124520256, 2124520474, 2124520719, 2124520751, 2124520772, 2124520802, 2124520849, 2124521309, 2124521465, 2124523910, 2124526960, 2124527796, 2124527902, 2124528434, 2124528435, 2124529485, 2124529486, 2124531053, 2124531277, 2124532144, 2124532149, 2124532157, 2124532163, 2124532164, 2124532165, 2124532190, 2124533253, 2124536058, 2124537563, 2124537857, 2124537858, 2124537934, 2124537936, 2124537942, 2124537963, 2124540201, 2124540680, 2124543618, 2124563423, 2124563424, 2124563425, 2124563426, 2124563427, 2124563428, 2124563429, 2124563433, 2124563434, 2124563435, 2124563436, 2124563438, 2124563439, 2124563440, 2124563441, 2124563442, 2124563443, 2124563444, 2124563445, 2124563446, 2124563447, 2124563448, 2124563449, 2124563450, 2124563452, 2124563453, 2124563454, 2124563455, 2124563456, 2124563457, 2124563458, 2124563461, 2124563463, 2124563464, 2124563465, 2124563466, 2124563468, 2124563469, 2124563470, 2124563471, 2124563472, 2124563473, 2124563474, 2124563475, 2124563476, 2124563480, 2124563481, 2124563482, 2124563485, 2124563486, 2124563487, 2124563488, 2124564083, 2124564086, 2124565754, 2124567525, 2124567526, 2124567528, 2124568811, 2124568813, 2124568821, 2124568828, 2124572793, 2124572794, 2124572796, 2124575636, 2124576198, 2124576200, 2124577026, 2124577027, 2124577028, 2124577030, 2124577032, 2124577045, 2124577049, 2124577050, 2124577624, 2124582293, 2124585595, 2124588285, 2124592079, 2124602399, 2124603913, 2124610560, 2124611551, 2124619422, 2124619423, 2124619428, 2124623468, 2124634239, 2124637839, 2124641800, 2124641807, 2124642336, 2124642338, 2124642339, 2124642340, 2124642341, 2124642343, 2124642348, 2124642351, 2124642354, 2124642356, 2124642357, 2124642359, 2124652180, 2124653884, 2124655019, 2124655024, 2124655193, 2124655948, 2124655949, 2124655971, 2124655975, 2124655990, 2124656004, 2124656030, 2124656036, 2124661633, 2124661634, 2124661635, 2124661637, 2124662155, 2124668567, 2124668570, 2124677275, 2124677276, 2124677277, 2124677279, 2124686025, 2124694487, 2124694491, 2124699596, 2124699599, 2124702086, 2124712613, 2124722019, 2124722867, 2124722870, 2124728041, 2124728042, 2124728053, 2124728054, 2124728056, 2124728060, 2124732077, 2124732078, 2124732714, 2124732716, 2124732719, 2124732721, 2124732728, 2124733040, 2124733065, 2124733199, 2124733207, 2124733209, 2124733593, 2124733896, 2124734395, 2124734451, 2124738648, 2124743893, 2124743895, 2124743896, 2124743900, 2124743901, 2124743903, 2124743908, 2124743910, 2124743914, 2124745911, 2124745913, 2124745914, 2124745915, 2124745916, 2124750398, 2124762118, 2124762119, 2124765199, 2124770335, 2124770995, 2124773781, 2124780104, 2124788709, 2124788711, 2124793144, 2124796614, 2124797292, 2124805649, 2124808281, 2124809011, 2124809014, 2124817983, 2124833063, 2124838092, 2124838094, 2124838100, 2124838101, 2124838115, 2124838116, 2124838122, 2124844475, 2124844476, 2124846735, 2124848507, 2124852420, 2124852423, 2124854161, 2124854193, 2124855376, 2124855377, 2124862216, 2124862224, 2124863604, 2124867582, 2124869226, 2124875434, 2124879813, 2124904006, 2124904335, 2124904344, 2124910530, 2124910531, 2124910820, 2124910833, 2124913760, 2124930575, 2124930578, 2125396251, 234563126, 242351513, 249079143, 251793172, 256024817, 256032339, 258548691, 261565689, 272350549, 275998753, 275999734, 276000784, 277447081, 277447585, 277448631, 277450626, 277450671, 280316225, 282537385, 282551309, 282551455, 282551528, 282551658, 282551802, 282552247, 291590700, 291593961, 291594894, 291595733, 291597053, 291597952, 291599289, 291600833, 291601653, 299579972, 300427924, 305020898, 305022149, 305022904, 305023937, 305024054, 305025523, 305025604, 305026089, 305027501, 305027615, 305028139, 305029358, 305029405, 305030422, 305030472, 305030506, 305030551, 305032210, 305032310, 305032372, 305034807, 305034899, 305034956, 305035024, 305035119, 305247229, 305247280, 305247358, 305247416, 305247473, 305801426, 306572280, 306855989, 307455407, 313337598, 313404459, 313408410, 313408543, 313803534, 315151077, 315479656, 316604080, 317862726, 318792885, 321396116, 330335638, 330578078, 340892412, 342183062, 342350725, 342726755, 345595693, 348325154, 358960294, 358960322, 358960339, 367905257, 372342286, 378276603, 378276664, 380473013, 382958561, 382958628, 382958700, 382958784, 386142827, 390274202, 396966203, 397898727, 398196953, 398648481, 402124969, 406234948, 409166337, 411449454, 415389070, 416429275, 425189457, 429382214, 433366647, 443217687, 443217720, 443217748, 443217790, 443218138, 443218216, 443218261, 443218282, 446875375, 446875931, 446876207, 448278808, 448571762, 449876713, 452082327, 454956782, 454956889, 454957071, 454957377, 457495858, 457502160, 463642870, 472107222, 475246581, 478787036, 484345110, 488436226, 489407985, 489422548, 491565470, 494626601, 498765734, 505451834, 505452530, 505453721, 505454090, 507867757, 524529129, 533084114, 533149212, 537304095, 541574287, 54772417, 555932252, 558071757, 560342438, 562467569, 566399814, 566400167, 566710856, 566711086, 566711400, 567677289, 568146807, 571649966, 57398419, 57506745, 575398322, 579263329, 582619666, 583060318, 583625410, 584872059, 585312481, 585329038, 587479980, 590416708, 590416802, 590416910, 590417175, 596409165, 600032758, 606676536, 615724768, 626820064, 632618713, 650312340, 657142873, 660072446, 66918518, 66918551, 66918611, 66918640, 66918685, 66918716, 66918795, 66918848, 66918916, 66918948, 66918988, 66919023, 66919105, 66919155, 66956295, 67932472, 684328540, 697194009, 712588665, 721542249, 721557757, 724152014, 746684621, 752670555, 756958677, 759899206, 763533363, 769508348, 769888690, 776288067, 780746219, 781267022, 781519171, 781597427, 782467805, 782780621, 791126082, 794159913, 794161330, 794162123, 794162868, 794165679, 794180575, 795085515, 808523944, 812019540, 81813271, 819136170, 828818707, 83058827, 835863449, 844062824, 846169305, 846169389, 846169515, 846170366, 85192183, 853327254, 853393294, 853403682, 853442723, 853443388, 853443954, 853444815, 853445684, 853446292, 853446952, 853447537, 853448061, 853477022, 853477598, 853478658, 853479188, 853479735, 853480158, 853480759, 853481396, 853481840, 853482328, 853482916, 853483547, 853484382, 853484978, 853485682, 853486866, 853989633, 853990714, 854013263, 854014715, 854422109, 891619357, 911298173, 911301163, 911309669, 911313332, 919383558, 928832517, 93530713, 935636727, 947417640, 958186842, 969649486, 969656130, 969658540, 970703713, 973250340, 981783590, 981784318, 981785232, 986042066, 986042955, 986049423, 986051218, 986052619, 998692397, 999721490]
