//graph para el diagrama
var graphMain = new joint.dia.Graph();
//paper para manejar el graph diagrama
var paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
    width: $('#paper').width(),
    height: $('#paper').height(),
    model: graphMain,
    gridSize: 5,
    snapLinks: { radius: 75 },
    linkPinning: false,
    markAvailable: true,
    background: {
        //color: '#0086ad'
        //color: '#ababab'
        color: '#484d53'
    },
    interactive: { vertexAdd: false },
});
paper.scale(0.63,0.63);

function createCircleChamp(x, y, name, img){
    var circle = new joint.shapes.basic.Image();
    circle.resize(60, 60);
    circle.position(x, y);
    circle.attr('root/title', '');
    circle.attr('label/text', name);
    circle.attr('body/fill', 'lightblue');
    circle.attr('image/xlink:href',img);
    circle.attr('image/width',50);
    circle.attr('image/height',50);
    circle.attr('customAttr/isClicked',false);
    circle.attr('customAttr/valueBag',0);
    circle.attr('customAttr/valueBagSug',0);
    circle.attr('customAttr/type','champion');
    circle.attr('customAttr/cantSug',0);
    circle.addTo(graphMain);

    return circle;
}



function createCircleTrait(x, y, name, img){
    var embeddedImage = new joint.shapes.standard.EmbeddedImage();
    embeddedImage.resize(90, 90);
    embeddedImage.position(x, y);
    embeddedImage.attr('root/tabindex', 10);
    embeddedImage.attr('root/title', '');
    embeddedImage.attr('label/text', name);
    embeddedImage.attr('label/fill', 'white');
    embeddedImage.attr('label/refY', "15%");
    embeddedImage.attr('label/refX', "50%");
    embeddedImage.attr('label/refX2', "0%");
    embeddedImage.attr('label/textAnchor', "middle");
    embeddedImage.attr('body/fill', '#403a34');
    embeddedImage.attr('body/fillOpacity', 1);
    embeddedImage.attr('body/stroke', '#000000');
    embeddedImage.attr('image/xlinkHref', img);
    embeddedImage.attr('image/refHeight', "50%");
    embeddedImage.attr('image/refWidth', "50%");
    embeddedImage.attr('image/x', "23");
    embeddedImage.attr('image/y', "30");
    embeddedImage.attr('customAttr/isClicked',false);
    embeddedImage.attr('customAttr/valueBag',0);
    embeddedImage.attr('customAttr/valueBagSug',0);
    embeddedImage.attr('customAttr/type','trait');
    embeddedImage.addTo(graphMain);


    var textBlock = new joint.shapes.standard.Rectangle();
    textBlock.resize(25, 25);
    textBlock.position(x+65, y+65); //90-25
    textBlock.attr('root/tabindex', -1);
    textBlock.attr('root/title', '');
    textBlock.attr('body/fill', 'none');
    textBlock.attr('body/stroke', 'none');
    textBlock.attr('body/fillOpacity', 1);
    textBlock.attr('label/text', '');
    textBlock.attr('label/fontSize', 20);
    textBlock.attr('label/fill', 'white');
    textBlock.attr('root/pointerEvents','none');    
    textBlock.attr('customAttr/type','countTrait');
    textBlock.addTo(graphMain);

    embeddedImage.attr('customAttr/textBlock',textBlock);
    embeddedImage.embed(textBlock);

    return embeddedImage;
}

function createRectSelect(x, y){
    var rect = new joint.shapes.standard.Rectangle();
    rect.position(x, y);
    rect.attr('root/title', '');
    rect.attr('label/text', '');
    rect.attr('body/fill', 'transparent');
    rect.attr('body/stroke', 'black');
    return rect;
}


function loadGraph(){
    var elem;
    var pos;
    var newLink;
    var traits = [];
    var target = null;
    for (var i = json.length - 1; i >= 0; i--) {
        pos = getPositionElement(json[i].name);
        if (pos==undefined){
            pos = [0,0]
        }
        elem = createCircleChamp(pos[0], pos[1], json[i].name, json[i].img);
        addLinkToTrait(json[i].elements, traits, elem);
        addLinkToTrait(json[i].class, traits, elem);
    }
}

function addLinkToTrait(arrayTraits, cacheTrait, elem){
    var pos;
    for (var j = arrayTraits.length - 1; j >= 0; j--) {
        target = containTrait(cacheTrait, arrayTraits[j]);
        if (target!=null){
            newLink = createLink();
            connectLink(newLink, target, elem);
        }else{
            pos = getPositionElement(arrayTraits[j]);
            img = getImgTrait(arrayTraits[j]);
            target = createCircleTrait(pos[0], pos[1], arrayTraits[j], img);
            newLink = createLink();
            connectLink(newLink, target, elem);
            cacheTrait.push([arrayTraits[j],target]);
        }
    }
}

function containTrait(traits, t) {
    for (var i = traits.length - 1; i >= 0; i--) {
        if (traits[i][0]==t){
            return traits[i][1];
        }
    }
    return null;
}

//var positionElements =[["Skarner",[-190,1000]],["Ashe",[-310,630]],["Crystal",[-110,750]],["Taric",[-200,500]],["Renekton",[-310,1000]],["Azir",[-20,1000]],["Sivir",[320,500]],["Desert",[110,750]],["KhaZix",[180,1000]],["Ornn",[-100,500]],["Zed",[80,1000]],["Ivern",[260,1210]],["Maokai",[300,1210]],["LeBlanc",[260,1000]],["Druid",[250,1270]],["Woodland",[250,1100]],["Neeko",[220,1210]],["Warwick",[-250,1000]],["Braum",[-250,500]],["Ezreal",[-310,730]],["Olaf",[-310,850]],["Glacial",[-250,750]],["Electric",[40,750]],["Volibear",[-310,950]],["Zyra",[-100,1000]],["Diana",[130,1000]],["Varus",[-310,680]],["Kindred",[-310,540]],["Inferno",[-180,750]],["Annie",[-140,1000]],["Nasus",[-150,500]],["Vayne",[-310,590]],["Jax",[-310,900]],["Aatrox",[280,500]],["Soraka",[120,500]],["Light",[-30,750]],["Yorick",[-60,1000]],["Taliyah",[310,1000]],["Mountain",[180,750]],["Malphite",[-50,500]],["Vladimir",[410,1000]],["Pilgrim",[450,1100]],["Syndra",[460,1000]],["Thresh",[50,500]],["Warden",[-100,400]],["Nautilus",[0,500]],["Ocean",[330,750]],["Nami",[170,500]],["KogMaw",[-480,1150]],["Berserker",[-400,820]],["Dr. Mundo",[-390,750]],["Ranger",[-480,580]],["Twitch",[-470,680]],["Alchemist",[-580,860]],["Poison",[-480,740]],["Singed",[-570,750]],["Summoner",[-60,1100]],["Malzahar",[20,1000]],["Mage",[330,1100]],["Veigar",[360,1000]],["Shadow",[260,750]],["Master Yi",[220,500]],["Predator",[-320,1140]],["RekSai",[-200,1150]],["Steel",[-210,1200]],["Nocturne",[90,1210]],["Blademaster",[260,400]],["Yasuo",[270,350]],["Mystic",[160,400]],["Wind",[220,270]],["Janna",[170,350]],["Assassin",[150,1100]],["Qiyana",[160,1210]],["Avatar",[150,1400]],["Variable",[150,1270]],["Lux",[160,1350]]];
//var positionElements =[["Skarner",[-190,1000]],["Ashe",[-310,630]],["Crystal",[-190,720]],["Taric",[-200,500]],["Renekton",[-310,1000]],["Azir",[-60,1000]],["Sivir",[280,650]],["Desert",[10,890]],["KhaZix",[180,1000]],["Ornn",[-100,500]],["Zed",[80,1000]],["Ivern",[470,1100]],["Maokai",[470,1050]],["LeBlanc",[240,1000]],["Druid",[570,1090]],["Woodland",[330,1090]],["Neeko",[470,1150]],["Warwick",[-250,1000]],["Braum",[-250,500]],["Ezreal",[-310,730]],["Olaf",[-310,850]],["Glacial",[-230,780]],["Electric",[-210,900]],["Volibear",[-310,950]],["Zyra",[-100,1000]],["Diana",[130,1000]],["Varus",[-310,680]],["Kindred",[-310,540]],["Inferno",[-100,670]],["Annie",[-140,1000]],["Nasus",[-150,500]],["Vayne",[-310,590]],["Jax",[-310,900]],["Aatrox",[280,580]],["Soraka",[160,500]],["Light",[40,720]],["Yorick",[-20,1000]],["Taliyah",[250,940]],["Mountain",[100,870]],["Malphite",[-50,500]],["Vladimir",[280,760]],["Pilgrim",[380,700]],["Syndra",[280,710]],["Thresh",[10,500]],["Warden",[-100,400]],["Nautilus",[60,500]],["Ocean",[190,720]],["Nami",[100,500]],["KogMaw",[-480,1150]],["Berserker",[-410,900]],["Dr. Mundo",[-390,750]],["Ranger",[-480,580]],["Twitch",[-470,680]],["Alchemist",[-580,860]],["Poison",[-480,740]],["Singed",[-570,750]],["Summoner",[-60,1100]],["Malzahar",[20,1000]],["Mage",[380,920]],["Veigar",[250,890]],["Shadow",[120,720]],["Master Yi",[280,510]],["Predator",[-320,1140]],["RekSai",[-200,1150]],["Steel",[-210,1200]],["Nocturne",[90,1210]],["Blademaster",[380,570]],["Yasuo",[390,510]],["Mystic",[160,400]],["Wind",[380,400]],["Janna",[260,410]],["Assassin",[120,1100]],["Qiyana",[170,1210]],["Avatar",[230,1090]],["Variable",[230,1200]],["Lux",[240,1160]]];
//var positionElements =[["Skarner",[-120,1000]],["Ashe",[-310,610]],["Crystal",[-120,720]],["Taric",[-190,510]],["Renekton",[-310,930]],["Azir",[0,1000]],["Sivir",[280,510]],["Desert",[0,720]],["KhaZix",[320,1000]],["Ornn",[-120,510]],["Zed",[250,1000]],["Ivern",[610,1000]],["Maokai",[610,950]],["LeBlanc",[400,1000]],["Druid",[690,990]],["Woodland",[500,990]],["Neeko",[610,1060]],["Warwick",[-250,1000]],["Braum",[-250,510]],["Ezreal",[-310,730]],["Olaf",[-310,800]],["Glacial",[-250,720]],["Electric",[-60,720]],["Volibear",[-310,870]],["Zyra",[-60,1000]],["Diana",[180,1000]],["Varus",[-310,670]],["Kindred",[-310,510]],["Inferno",[-190,720]],["Annie",[-180,1000]],["Nasus",[-50,510]],["Vayne",[-310,560]],["Jax",[-310,1000]],["Aatrox",[340,510]],["Soraka",[400,580]],["Light",[80,720]],["Yorick",[60,1000]],["Taliyah",[400,860]],["Mountain",[240,720]],["Malphite",[20,510]],["Vladimir",[400,790]],["Syndra",[400,710]],["Thresh",[90,510]],["Warden",[-100,400]],["Nautilus",[170,510]],["Ocean",[310,720]],["Nami",[400,650]],["KogMaw",[-470,1120]],["Berserker",[-410,880]],["Dr. Mundo",[-390,750]],["Ranger",[-480,600]],["Twitch",[-470,680]],["Alchemist",[-580,860]],["Poison",[-480,740]],["Singed",[-570,750]],["Summoner",[-60,1100]],["Malzahar",[120,1000]],["Mage",[500,860]],["Veigar",[400,930]],["Shadow",[160,720]],["Master Yi",[400,510]],["Predator",[-250,1110]],["RekSai",[-240,1200]],["Steel",[-60,1190]],["Nocturne",[240,1200]],["Blademaster",[330,410]],["Yasuo",[410,420]],["Mystic",[500,620]],["Wind",[490,410]],["Janna",[500,520]],["Assassin",[270,1100]],["Qiyana",[320,1200]],["Avatar",[520,1190]],["Variable",[380,1190]],["Lux",[460,1200]]];
//var positionElements =[["Skarner",[-120,1000]],["Ashe",[-310,610]],["Crystal",[-110,720]],["Taric",[-190,510]],["Renekton",[-310,930]],["Azir",[0,1000]],["Sivir",[280,510]],["Desert",[20,720]],["KhaZix",[320,1000]],["Ornn",[-120,510]],["Zed",[250,1000]],["Ivern",[600,1000]],["Maokai",[600,950]],["LeBlanc",[400,1000]],["Druid",[680,990]],["Woodland",[500,990]],["Neeko",[600,1050]],["Warwick",[-250,1000]],["Braum",[-250,510]],["Ezreal",[-310,730]],["Olaf",[-310,800]],["Glacial",[-250,720]],["Electric",[-50,720]],["Volibear",[-310,870]],["Zyra",[-60,1000]],["Diana",[180,1000]],["Varus",[-310,670]],["Kindred",[-310,510]],["Inferno",[-180,720]],["Annie",[-180,1000]],["Nasus",[-50,510]],["Vayne",[-310,560]],["Jax",[-310,1000]],["Aatrox",[340,510]],["Soraka",[400,580]],["Light",[100,720]],["Yorick",[60,1000]],["Taliyah",[400,860]],["Mountain",[240,720]],["Malphite",[20,510]],["Vladimir",[400,790]],["Syndra",[400,730]],["Thresh",[90,510]],["Warden",[-40,410]],["Nautilus",[170,510]],["Ocean",[310,720]],["Nami",[400,650]],["KogMaw",[-470,1110]],["Berserker",[-415,880]],["Dr. Mundo",[-390,750]],["Ranger",[-480,600]],["Twitch",[-470,680]],["Alchemist",[-580,860]],["Poison",[-480,740]],["Singed",[-570,750]],["Summoner",[30,1100]],["Malzahar",[120,1000]],["Mage",[500,860]],["Veigar",[400,930]],["Shadow",[170,720]],["Master Yi",[400,510]],["Predator",[-200,1100]],["RekSai",[-190,1200]],["Steel",[30,1190]],["Nocturne",[240,1200]],["Blademaster",[330,410]],["Yasuo",[410,420]],["Mystic",[490,570]],["Wind",[490,410]],["Janna",[500,510]],["Assassin",[270,1100]],["Qiyana",[320,1200]],["Avatar",[590,1190]],["Variable",[400,1190]],["Lux",[510,1200]]];
//var positionElements =[["Skarner",[210,560]],["Ashe",[180,350]],["Crystal",[210,430]],["Taric",[230,350]],["Renekton",[550,570]],["Azir",[600,570]],["Sivir",[650,360]],["Desert",[620,440]],["KhaZix",[650,570]],["Ornn",[400,350]],["Zed",[420,560]],["Ivern",[1330,590]],["Maokai",[1330,520]],["LeBlanc",[1080,580]],["Druid",[1470,570]],["Woodland",[1170,570]],["Neeko",[1330,650]],["Warwick",[320,570]],["Braum",[300,350]],["Ezreal",[360,360]],["Olaf",[260,570]],["Glacial",[310,430]],["Electric",[390,440]],["Volibear",[370,570]],["Zyra",[780,570]],["Diana",[850,570]],["Varus",[690,360]],["Kindred",[750,360]],["Inferno",[710,440]],["Annie",[710,570]],["Nasus",[540,360]],["Vayne",[450,360]],["Jax",[460,570]],["Aatrox",[610,360]],["Soraka",[500,360]],["Light",[500,440]],["Yorick",[510,570]],["Taliyah",[920,450]],["Mountain",[920,350]],["Malphite",[860,360]],["Vladimir",[1020,360]],["Syndra",[1060,450]],["Thresh",[1090,360]],["Warden",[570,170]],["Nautilus",[1160,360]],["Ocean",[1150,440]],["Nami",[1240,360]],["KogMaw",[140,710]],["Berserker",[390,720]],["Dr. Mundo",[140,560]],["Ranger",[200,160]],["Twitch",[40,560]],["Alchemist",[-150,560]],["Poison",[30,700]],["Singed",[-150,710]],["Summoner",[650,710]],["Malzahar",[930,570]],["Mage",[980,440]],["Veigar",[1010,570]],["Shadow",[800,450]],["Master Yi",[800,360]],["Predator",[220,710]],["RekSai",[410,840]],["Steel",[650,830]],["Nocturne",[850,830]],["Blademaster",[780,180]],["Yasuo",[920,190]],["Mystic",[1240,180]],["Wind",[1020,180]],["Janna",[1130,190]],["Assassin",[920,710]],["Qiyana",[980,830]],["Avatar",[1300,830]],["Variable",[1060,830]],["Lux",[1180,840]]];
//var positionElements =[["Skarner",[430,750]],["Ashe",[240,360]],["Crystal",[440,470]],["Taric",[390,260]],["Renekton",[240,680]],["Azir",[550,750]],["Sivir",[810,260]],["Desert",[570,470]],["KhaZix",[870,750]],["Ornn",[460,260]],["Zed",[800,750]],["Ivern",[1150,750]],["Maokai",[1150,700]],["LeBlanc",[950,750]],["Druid",[1230,740]],["Woodland",[1050,740]],["Neeko",[1150,800]],["Warwick",[300,750]],["Braum",[320,260]],["Ezreal",[240,480]],["Olaf",[240,550]],["Glacial",[300,470]],["Electric",[500,470]],["Volibear",[240,620]],["Zyra",[490,750]],["Diana",[730,750]],["Varus",[240,420]],["Kindred",[240,260]],["Inferno",[370,470]],["Annie",[360,750]],["Nasus",[530,260]],["Vayne",[240,310]],["Jax",[240,750]],["Aatrox",[880,260]],["Soraka",[950,330]],["Light",[650,470]],["Yorick",[610,750]],["Taliyah",[950,610]],["Mountain",[790,470]],["Malphite",[600,260]],["Vladimir",[950,540]],["Syndra",[950,480]],["Thresh",[670,260]],["Warden",[520,160]],["Nautilus",[740,260]],["Ocean",[860,470]],["Nami",[950,400]],["KogMaw",[80,860]],["Berserker",[150,610]],["Dr. Mundo",[160,500]],["Ranger",[70,350]],["Twitch",[80,430]],["Alchemist",[-30,610]],["Poison",[70,490]],["Singed",[-20,500]],["Summoner",[570,840]],["Malzahar",[670,750]],["Mage",[1050,610]],["Veigar",[950,680]],["Shadow",[720,470]],["Master Yi",[950,260]],["Predator",[350,850]],["RekSai",[360,950]],["Steel",[580,940]],["Nocturne",[790,950]],["Blademaster",[880,160]],["Yasuo",[960,170]],["Mystic",[1040,320]],["Wind",[1040,160]],["Janna",[1050,260]],["Assassin",[820,850]],["Qiyana",[870,950]],["Avatar",[1140,940]],["Variable",[950,940]],["Lux",[1060,950]]];
//var positionElements =[["Skarner",[430,750]],["Ashe",[240,360]],["Crystal",[440,470]],["Taric",[390,260]],["Renekton",[240,680]],["Azir",[550,750]],["Sivir",[810,260]],["Desert",[570,470]],["KhaZix",[870,750]],["Ornn",[460,260]],["Zed",[800,750]],["Ivern",[1150,750]],["Maokai",[1150,700]],["LeBlanc",[950,750]],["Druid",[1230,740]],["Woodland",[1050,740]],["Neeko",[1150,800]],["Warwick",[300,750]],["Braum",[320,260]],["Ezreal",[240,480]],["Olaf",[240,550]],["Glacial",[300,470]],["Electric",[500,470]],["Volibear",[240,620]],["Zyra",[490,750]],["Diana",[730,750]],["Varus",[240,420]],["Kindred",[240,260]],["Inferno",[370,470]],["Annie",[360,750]],["Nasus",[530,260]],["Vayne",[240,310]],["Jax",[240,750]],["Aatrox",[880,260]],["Soraka",[950,330]],["Light",[650,470]],["Yorick",[610,750]],["Taliyah",[950,610]],["Mountain",[790,470]],["Malphite",[600,260]],["Vladimir",[950,540]],["Syndra",[950,480]],["Thresh",[670,260]],["Warden",[520,160]],["Nautilus",[740,260]],["Ocean",[860,470]],["Nami",[950,400]],["KogMaw",[80,860]],["Berserker",[150,610]],["Dr. Mundo",[160,500]],["Ranger",[70,350]],["Twitch",[80,430]],["Alchemist",[-30,610]],["Poison",[70,490]],["Singed",[-20,500]],["Summoner",[570,840]],["Malzahar",[670,750]],["Mage",[1050,610]],["Veigar",[950,680]],["Shadow",[720,470]],["Master Yi",[950,260]],["Predator",[350,850]],["RekSai",[360,950]],["Steel",[580,940]],["Nocturne",[790,950]],["Blademaster",[880,160]],["Yasuo",[960,170]],["Mystic",[1040,320]],["Wind",[1040,160]],["Janna",[1050,260]],["Assassin",[820,850]],["Qiyana",[870,950]],["Avatar",[1140,940]],["Variable",[950,940]],["Lux",[1060,950]]];
//var positionElements =[["Skarner",[615,735]],["Ashe",[285,375]],["Crystal",[570,435]],["Taric",[435,240]],["Renekton",[285,735]],["Azir",[765,735]],["Sivir",[975,240]],["Desert",[780,435]],["KhaZix",[1185,735]],["Ornn",[510,240]],["Zed",[1080,735]],["Ivern",[1410,810]],["Maokai",[1500,810]],["LeBlanc",[1305,735]],["Druid",[1395,900]],["Woodland",[1395,705]],["Neeko",[1320,810]],["Warwick",[450,735]],["Braum",[360,240]],["Ezreal",[285,510]],["Olaf",[285,585]],["Glacial",[360,435]],["Electric",[675,435]],["Volibear",[285,660]],["Zyra",[690,735]],["Diana",[1005,735]],["Varus",[285,435]],["Kindred",[285,240]],["Inferno",[465,435]],["Annie",[525,735]],["Nasus",[600,240]],["Vayne",[285,300]],["Jax",[375,735]],["Aatrox",[1110,240]],["Soraka",[1305,300]],["Light",[885,435]],["Yorick",[840,735]],["Taliyah",[1305,585]],["Mountain",[1095,435]],["Malphite",[675,240]],["Vladimir",[1305,510]],["Syndra",[1305,435]],["Thresh",[765,240]],["Warden",[570,125]],["Nautilus",[870,240]],["Ocean",[1200,435]],["Nami",[1305,360]],["KogMaw",[90,825]],["Berserker",[165,630]],["Dr. Mundo",[180,480]],["Ranger",[165,315]],["Twitch",[90,345]],["Alchemist",[-15,585]],["Poison",[75,465]],["Singed",[0,480]],["Summoner",[780,825]],["Malzahar",[930,735]],["Mage",[1395,585]],["Veigar",[1305,660]],["Shadow",[990,435]],["Master Yi",[1305,240]],["Predator",[400,815]],["RekSai",[630,840]],["Steel",[630,900]],["Nocturne",[810,930]],["Blademaster",[1095,135]],["Yasuo",[1305,150]],["Mystic",[1410,315]],["Wind",[1410,135]],["Janna",[1425,240]],["Assassin",[1170,810]],["Qiyana",[960,930]],["Avatar",[1290,900]],["Variable",[1095,900]],["Lux",[1215,930]]];
//var positionElements =[["Skarner",[465,720]],["Ashe",[300,300]],["Crystal",[585,420]],["Taric",[600,225]],["Renekton",[300,660]],["Azir",[785,715]],["Sivir",[1140,225]],["Desert",[795,420]],["KhaZix",[1205,715]],["Ornn",[690,225]],["Zed",[1100,715]],["Ivern",[1425,795]],["Maokai",[1515,795]],["LeBlanc",[1325,715]],["Druid",[1410,885]],["Woodland",[1415,685]],["Neeko",[1335,795]],["Warwick",[390,720]],["Braum",[510,225]],["Ezreal",[300,435]],["Olaf",[300,510]],["Glacial",[375,420]],["Electric",[690,420]],["Volibear",[300,585]],["Zyra",[705,720]],["Diana",[1025,715]],["Varus",[300,360]],["Kindred",[405,225]],["Inferno",[480,420]],["Annie",[630,720]],["Nasus",[780,225]],["Vayne",[300,225]],["Jax",[300,720]],["Aatrox",[1245,225]],["Soraka",[1325,280]],["Light",[900,420]],["Yorick",[860,715]],["Taliyah",[1325,565]],["Mountain",[1110,420]],["Malphite",[870,225]],["Vladimir",[1325,490]],["Syndra",[1325,415]],["Thresh",[960,225]],["Warden",[780,120]],["Nautilus",[1050,225]],["Ocean",[1215,420]],["Nami",[1325,340]],["KogMaw",[105,825]],["Berserker",[185,610]],["Dr. Mundo",[200,460]],["Ranger",[185,295]],["Twitch",[110,325]],["Alchemist",[5,565]],["Poison",[95,445]],["Singed",[20,460]],["Summoner",[855,795]],["Malzahar",[950,715]],["Mage",[1425,555]],["Veigar",[1325,640]],["Shadow",[1005,420]],["Master Yi",[1325,220]],["Predator",[435,810]],["RekSai",[540,720]],["Steel",[675,870]],["Nocturne",[830,910]],["Blademaster",[1185,120]],["Yasuo",[1325,130]],["Mystic",[1430,295]],["Wind",[1430,115]],["Janna",[1445,220]],["Assassin",[1140,795]],["Qiyana",[980,910]],["Avatar",[1305,885]],["Variable",[1110,885]],["Lux",[1230,900]]];
//var positionElements =[["Skarner",[465,705]],["Ashe",[300,300]],["Crystal",[585,450]],["Taric",[600,225]],["Renekton",[300,645]],["Azir",[795,705]],["Sivir",[1155,225]],["Desert",[795,450]],["KhaZix",[1230,705]],["Ornn",[705,225]],["Zed",[1140,705]],["Ivern",[1425,795]],["Maokai",[1515,795]],["LeBlanc",[1320,705]],["Druid",[1410,885]],["Woodland",[1415,685]],["Neeko",[1335,795]],["Warwick",[390,705]],["Braum",[525,225]],["Ezreal",[300,420]],["Olaf",[300,525]],["Glacial",[375,450]],["Electric",[690,450]],["Volibear",[300,585]],["Zyra",[705,705]],["Diana",[1050,705]],["Varus",[300,360]],["Kindred",[405,225]],["Inferno",[480,450]],["Annie",[630,705]],["Nasus",[780,225]],["Vayne",[300,225]],["Jax",[300,705]],["Aatrox",[1230,225]],["Soraka",[1320,285]],["Light",[900,450]],["Yorick",[870,705]],["Taliyah",[1320,570]],["Mountain",[1110,450]],["Malphite",[870,225]],["Vladimir",[1320,495]],["Syndra",[1320,420]],["Thresh",[960,225]],["Warden",[780,120]],["Nautilus",[1050,225]],["Ocean",[1215,450]],["Nami",[1320,345]],["KogMaw",[120,810]],["Berserker",[185,610]],["Dr. Mundo",[210,465]],["Ranger",[185,295]],["Twitch",[120,315]],["Alchemist",[5,565]],["Poison",[105,450]],["Singed",[15,465]],["Summoner",[855,780]],["Malzahar",[960,705]],["Mage",[1425,525]],["Veigar",[1320,630]],["Shadow",[1005,450]],["Master Yi",[1320,225]],["Predator",[435,795]],["RekSai",[540,705]],["Steel",[675,885]],["Nocturne",[825,900]],["Blademaster",[1215,120]],["Yasuo",[1325,130]],["Mystic",[1430,295]],["Wind",[1430,115]],["Janna",[1445,220]],["Assassin",[1125,780]],["Qiyana",[990,900]],["Avatar",[1305,885]],["Variable",[1125,885]],["Lux",[1230,900]]];
//var positionElements =[["Skarner",[465,705]],["Ashe",[300,300]],["Crystal",[585,450]],["Taric",[600,225]],["Renekton",[300,645]],["Azir",[795,705]],["Sivir",[1155,225]],["Desert",[795,450]],["KhaZix",[1230,705]],["Ornn",[705,225]],["Zed",[1140,705]],["Ivern",[1385,795]],["Maokai",[1460,795]],["LeBlanc",[1320,705]],["Druid",[1425,885]],["Woodland",[1425,690]],["Neeko",[1310,795]],["Warwick",[390,705]],["Braum",[525,225]],["Ezreal",[300,420]],["Olaf",[300,525]],["Glacial",[375,450]],["Electric",[690,450]],["Volibear",[300,585]],["Zyra",[705,705]],["Diana",[1050,705]],["Varus",[300,360]],["Kindred",[405,225]],["Inferno",[480,450]],["Annie",[630,705]],["Nasus",[780,225]],["Vayne",[300,225]],["Jax",[300,705]],["Aatrox",[1230,225]],["Soraka",[1320,285]],["Light",[900,450]],["Yorick",[870,705]],["Taliyah",[1320,570]],["Mountain",[1110,450]],["Malphite",[870,225]],["Vladimir",[1320,495]],["Syndra",[1320,420]],["Thresh",[960,225]],["Warden",[780,120]],["Nautilus",[1050,225]],["Ocean",[1215,450]],["Nami",[1320,345]],["KogMaw",[120,810]],["Berserker",[185,610]],["Dr. Mundo",[210,465]],["Ranger",[185,295]],["Twitch",[120,315]],["Alchemist",[0,615]],["Poison",[105,450]],["Singed",[15,465]],["Summoner",[855,780]],["Malzahar",[960,705]],["Mage",[1425,525]],["Veigar",[1320,630]],["Shadow",[1005,450]],["Master Yi",[1320,225]],["Predator",[435,795]],["RekSai",[540,705]],["Steel",[675,885]],["Nocturne",[825,900]],["Blademaster",[1215,120]],["Yasuo",[1325,130]],["Mystic",[1430,295]],["Wind",[1430,115]],["Janna",[1445,220]],["Assassin",[1125,780]],["Qiyana",[990,900]],["Avatar",[1305,885]],["Variable",[1125,885]],["Lux",[1230,900]]];
//var positionElements =[["Skarner",[505,750]],["Ashe",[300,300]],["",[650,515]],["Crystal",[585,450]],["Taric",[600,225]],["Renekton",[300,655]],["Azir",[810,750]],["Sivir",[1155,225]],["",[860,515]],["Desert",[795,450]],["KhaZix",[1225,750]],["Ornn",[705,225]],["Zed",[1145,750]],["Ivern",[1385,855]],["Maokai",[1460,855]],["LeBlanc",[1320,750]],["",[1490,990]],["Druid",[1425,925]],["",[1490,800]],["Woodland",[1425,735]],["Neeko",[1310,855]],["Warwick",[440,750]],["Braum",[525,225]],["Ezreal",[300,420]],["Olaf",[300,495]],["",[440,515]],["Glacial",[375,450]],["",[755,515]],["Electric",[690,450]],["Volibear",[300,580]],["Zyra",[725,750]],["Diana",[1050,750]],["Varus",[300,360]],["Kindred",[405,225]],["Annie",[645,750]],["Nasus",[780,225]],["Vayne",[300,225]],["Jax",[300,745]],["Aatrox",[1230,225]],["Soraka",[1320,285]],["",[965,515]],["Light",[900,450]],["Yorick",[875,750]],["Taliyah",[1320,570]],["",[1175,515]],["Mountain",[1110,450]],["Malphite",[870,225]],["Vladimir",[1320,495]],["Syndra",[1320,420]],["Thresh",[960,225]],["",[845,185]],["Warden",[780,120]],["Nautilus",[1050,225]],["",[1280,515]],["Ocean",[1215,450]],["Nami",[1320,345]],["KogMaw",[115,895]],["Dr. Mundo",[210,465]],["",[250,360]],["Ranger",[185,295]],["Twitch",[120,315]],["",[65,680]],["Alchemist",[0,615]],["",[170,515]],["Poison",[105,450]],["Singed",[15,465]],["",[920,900]],["Summoner",[855,835]],["Malzahar",[960,750]],["Veigar",[1320,630]],["Master Yi",[1320,225]],["",[560,950]],["Predator",[495,885]],["RekSai",[575,750]],["",[740,950]],["Steel",[675,885]],["Nocturne",[875,940]],["",[1280,185]],["Blademaster",[1215,120]],["Yasuo",[1325,130]],["",[1495,360]],["Mystic",[1430,295]],["",[1495,180]],["Wind",[1430,115]],["Janna",[1445,220]],["",[1235,895]],["Assassin",[1170,830]],["Qiyana",[995,945]],["",[1375,990]],["Avatar",[1310,925]],["",[1190,990]],["Variable",[1125,925]],["Lux",[1230,960]],["",[1490,590]],["Mage",[1425,525]],["",[545,515]],["Inferno",[480,450]],["Brand",[1320,690]],["",[250,675]],["Berserker",[185,610]],["",[1070,515]],["Shadow",[1005,450]],["Sion",[370,745]]];
var positionElements =[["Skarner",[505,750]],["Ashe",[300,300]],["",[650,515]],["Crystal",[585,450]],["Taric",[600,225]],["Renekton",[300,655]],["Azir",[810,750]],["Sivir",[1155,225]],["",[860,515]],["Desert",[795,450]],["KhaZix",[1225,750]],["Ornn",[705,225]],["Zed",[1145,750]],["Ivern",[1385,850]],["Maokai",[1460,850]],["LeBlanc",[1320,750]],["",[1490,985]],["Druid",[1425,920]],["",[1490,800]],["Woodland",[1425,735]],["Neeko",[1310,850]],["Warwick",[440,750]],["Braum",[525,225]],["Ezreal",[300,420]],["Olaf",[300,495]],["",[440,515]],["Glacial",[375,450]],["",[755,515]],["Electric",[690,450]],["Volibear",[300,580]],["Zyra",[725,750]],["Diana",[1050,750]],["Varus",[300,360]],["Kindred",[405,225]],["Annie",[645,750]],["Nasus",[780,225]],["Vayne",[300,225]],["Jax",[300,745]],["Aatrox",[1230,225]],["Soraka",[1320,285]],["",[965,515]],["Light",[900,450]],["Yorick",[875,750]],["Taliyah",[1320,570]],["",[1175,515]],["Mountain",[1110,450]],["Malphite",[870,225]],["Vladimir",[1320,495]],["Syndra",[1320,420]],["Thresh",[960,225]],["",[845,175]],["Warden",[780,110]],["Nautilus",[1050,225]],["",[1280,515]],["Ocean",[1215,450]],["Nami",[1320,345]],["KogMaw",[115,930]],["Dr. Mundo",[210,465]],["",[250,360]],["Ranger",[185,295]],["Twitch",[120,315]],["",[65,680]],["Alchemist",[0,615]],["",[165,515]],["Poison",[100,450]],["Singed",[20,465]],["",[920,890]],["Summoner",[855,825]],["Malzahar",[960,750]],["Veigar",[1320,630]],["Master Yi",[1320,225]],["",[560,980]],["Predator",[495,915]],["RekSai",[575,750]],["",[735,980]],["Steel",[670,915]],["Nocturne",[875,930]],["",[1280,175]],["Blademaster",[1215,110]],["Yasuo",[1325,125]],["",[1495,360]],["Mystic",[1430,295]],["",[1495,175]],["Wind",[1430,110]],["Janna",[1445,220]],["",[1235,885]],["Assassin",[1170,820]],["Qiyana",[1010,930]],["",[1375,980]],["Avatar",[1310,915]],["",[1190,980]],["Variable",[1125,915]],["Lux",[1230,930]],["",[1485,630]],["Mage",[1420,565]],["",[545,515]],["Inferno",[480,450]],["Brand",[1320,690]],["",[255,660]],["Berserker",[190,595]],["",[1070,515]],["Shadow",[1005,450]],["Sion",[370,745]]];

function getPositionElement(elem) {
    var pos;
    for (var i = 0; i < positionElements.length; i++) {
        if (positionElements[i][0]==elem){
            pos = positionElements[i][1];
        }
    }
    if (pos == undefined){
        pos = [0,0];
    }
    newPos =[pos[0],pos[1]-100]
    return newPos;
}

function getImgTrait(nameTrait) {
    var linkimg;
    for (var i = infoTraits.length - 1; i >= 0; i--) {
        if (infoTraits[i].name == nameTrait){
            linkimg = infoTraits[i].img;
        }
    }
    return linkimg;
}

function showPosition(){
    var champs = graphMain.getCells();
    var jsonPosition = [];
    var aux;
    for (var i = champs.length - 1; i >= 0; i--) {
        var type = champs[i].attributes.type;
        if (type != 'standard.Link'){
            aux = [champs[i].attr('label/text'),[champs[i].position().x,champs[i].position().y]];
            jsonPosition.push(aux);
        }
    }
    console.log(JSON.stringify(jsonPosition))
}


///////////////////////////////////////////////////
///////Eventos visuales
///////////////////////////////////////////////////

//para dragear la pagina. (Con el boton del medio "wheel")
paper.on('blank:pointerdown', function (event, x, y) {
    if (event.originalEvent.buttons==4){
        var scale = paper.scale();
        var dragStartPositionMain = {
            x: x * scale.sx,
            y: y * scale.sy
        };
        $("#paper").mousemove(function (event) {
            if (dragStartPositionMain != null) {
                paper.translate(
                    event.offsetX - dragStartPositionMain.x,
                    event.offsetY - dragStartPositionMain.y);
            }
        });
        paper.on('cell:pointerup blank:pointerup', function (cellView, x, y) {
            dragStartPositionMain = null;
        });
    }
});

function centerPage(){
    paper.translate(0,0);
}


$('#paper').on('mousewheel DOMMouseScroll', function (evt, x, y) {
	evt.preventDefault();
	var delta = Math.max(-1, Math.min(1, (evt.originalEvent.wheelDelta || -evt.originalEvent.detail)));
	var newScale = paper.scale().sx + delta / 50;
    if (newScale > 0.1 && newScale < 2) {
		//paper.translate(0, 0);
		paper.scale(newScale, newScale); //, p.x, p.y);
	}
});

colorSet = ['transparent','#76cd26','#5500FF','#7d26cd','#ff002b','#ff00aa','#000000','#000000','#000000','#000000'];

hightComposition = { 
    highlighter: {
        name: 'stroke',
        options: {
            width: 4,
            padding: 10,
            rx: 5,
            ry: 5,
            attrs: {
                'stroke-width': 3,
                stroke: '#AAFF00'
            }
        }
    }
};

//para sugerencias
hightSug = { 
    highlighter: {
        name: 'stroke',
        options: {
            width: 4,
            padding: 10,
            rx: 5,
            ry: 5,
            attrs: {
                'stroke-width': 3,
                stroke: 'darkgray'
            }
        }
    }
};

hightSearch = { 
    highlighter: {
        name: 'stroke',
        options: {
            width: 3,
            padding: 15,
            rx: 10,
            ry: 10,
            attrs: {
                'stroke-width': 7,
                stroke: '#f0ff00'
            }
        }
    }
};

var bag = new Map();
var bagSug = new Map();

var remove = [];
var onComposition = [];
//mostrar highlight de los elementos con el click
paper.on('element:pointerclick', function(element) {
    if (element.model.attr('customAttr/type')=='trait'){
        navigateTrait(element.model);
    }else{
            //si el elemento aun no fue seleccionado, se selecciona
            navigateChampion(element.model);
        }
        paintLinksOnComposition();
        paintBag();
        paintBagSug();
        /*printBag(bag);
        console.log("----")
        printBag(bagSug);*/
        updateComposition();
        updateCompositionSuggestion();

    })

//Elimina element y actualiza sus neightbors
paper.on('element:contextmenu', function(element) {
    if (bag.has(element.model) && bag.get(element.model)!=0){
        if (element.model.attr('customAttr/type')=='trait'){
            navigateTraitForDelete(element.model);
        }else{
            //si el elemento aun no fue seleccionado, se selecciona
            navigateChampionForDelete(element.model);
        }
        removeElements();
        paintBag();
        paintBagSug();
        updateComposition();
        updateCompositionSuggestion();
        /*printBag(bag);
        console.log("----")
        printBag(bagSug);*/
    }
})

function printBag(bag) {
    var auxelem;
    var el;
    bag.forEach(function (val, key) {
        console.log(key.attr('label/text')+"."+val);
    });
}


//Resetear los elementos
paper.on('blank:pointerclick', function() {
    var cells = graphMain.getCells();
    for (var i = cells.length - 1; i >= 0; i--) {
        if (cells[i].attributes.type!='standard.Link'){
            hightComposition.highlighter.options.attrs.stroke = colorSet[cells[i].attr('customAttr/valueBag')];
            paper.findViewByModel(cells[i]).unhighlight(null, hightComposition);
            paper.findViewByModel(cells[i]).unhighlight(null, hightSug);
            cells[i].attr('customAttr/valueBag',0);
            cells[i].attr('customAttr/isClicked',false);
            var cantComp = cells[i].attr('customAttr/textBlock');
            if (cantComp!=undefined){
                cantComp.attr('label/text', '');
            }
        }else{
            cells[i].attr('line/stroke','#d6d7d8');
            cells[i].attr('customAttr/isOnComposition',false);
        }
    }
    bag = new Map();
    bagSug = new Map();
    remove = [];
    onComposition = [];
    updateComposition();
    updateCompositionSuggestion();
});

//Actualiza los elementos.
function removeElements() {
    for (var i = remove.length - 1; i >= 0; i--) {
        if (remove[i].attributes.type=='basic.Image'){
            hightComposition.highlighter.options.attrs.stroke = colorSet[remove[i].attr('customAttr/valueBag')];
            paper.findViewByModel(remove[i]).unhighlight(null, hightComposition);
            remove[i].attr('customAttr/valueBag',0);
            remove[i].attr('customAttr/isClicked',false);
            bag.delete(remove[i]);
        }else if (remove[i].attributes.type=='standard.EmbeddedImage'){
            if (bag.get(remove[i])<=0){
                hightComposition.highlighter.options.attrs.stroke = colorSet[remove[i].attr('customAttr/valueBag')];
                paper.findViewByModel(remove[i]).unhighlight(null, hightComposition);
                remove[i].attr('customAttr/valueBag',0);
                remove[i].attr('customAttr/isClicked',false);
                var cantComp = remove[i].attr('customAttr/textBlock');
                if (cantComp!=undefined){
                    cantComp.attr('label/text', '');
                }
                bag.delete(remove[i]);
            }
        }else if (remove[i].attributes.type=='standard.Link'){
            remove[i].attr('line/stroke','#d6d7d8');
            remove[i].attr('customAttr/isOnComposition',false);
        }
    }
    remove = [];

}

//pinta los links que pertenecen a la composicion.
function paintLinksOnComposition() {
    for (var i = onComposition.length - 1; i >= 0; i--) {
        onComposition[i].attr('line/stroke','yellow');
        onComposition[i].attr('customAttr/isOnComposition',true);
    }
    onComposition = [];
}

//pinta los element de bagSug con highlight.
function paintBagSug() {
    var auxelem;
    var del = [];
    bagSug.forEach(function (val, key) {
        if (!bag.has(key)){
            paper.findViewByModel(key).highlight(null, hightSug);
        }
        if (val==0){
            paper.findViewByModel(key).unhighlight(null, hightSug);
            bagSug.delete(key);
        }
    });
}

//pinta los element de bag con highlight.
function paintBag() {
    var auxelem;
    var el;
    bag.forEach(function (val, key) {
        repaintElement(key, val);
    });
}

function repaintElement(element, value) {
    /*eliminar highlight anterior*/
    if (element.attr('customAttr/valueBag') >= 0){
        hightComposition.highlighter.options.attrs.stroke = colorSet[element.attr('customAttr/valueBag')];
        paper.findViewByModel(element).unhighlight(null, hightComposition);
    }
    /*Eliminar highlight de sugerencia*/
    paper.findViewByModel(element).unhighlight(null, hightSug);
    /*setear color nuevo*/
    hightComposition.highlighter.options.attrs.stroke = colorSet[value];
    element.attr('customAttr/valueBag',value);
    paper.findViewByModel(element).highlight(null, hightComposition);

    var cantComp = element.attr('customAttr/textBlock');
    if (cantComp!=undefined){
        cantComp.attr('label/text', value);
    }
}

//highlight para cuando se busca un champion desde el cuadro de busqueda
function highlightChampSearch(input){
    var txt = input.value;
    var cells = graphMain.getElements();
    for (var i = cells.length - 1; i >= 0; i--) {
        if (cells[i].attr('customAttr/type')=='trait' || cells[i].attr('customAttr/type')=='champion'){
            if (txt!='' && (cells[i].attr('label/text')).toUpperCase().startsWith(txt.toUpperCase())){
                paper.findViewByModel(cells[i]).highlight(null, hightSearch);
            }else{
                paper.findViewByModel(cells[i]).unhighlight(null, hightSearch);
            }
        }
    }
}

function updateComposition(){
    var traits=[];
    var champs=[];
    var aux;
    bag.forEach(function (val, key) {
        aux = [key.attr('label/text'), val];        
        if (key.attr('customAttr/type')=='trait'){
            traits.push(aux);
        }else if (key.attr('customAttr/type')=='champion'){
            champs.push(aux);
        }
    });

    var newTraits = traits.sort(compare);
    var newChamp = champs.sort(compare);

    $("#composition-actual-traits").empty();
    $("#composition-actual-traits").append('<table id="table-compo-trait"><thead><tr><th>Class/Element</th><th>Count</th></tr></thead></table>');
    for (var i = newTraits.length - 1; i >= 0; i--) {
        $("#table-compo-trait").append('<tr class="table-compo"><td>'+newTraits[i][0]+'</td><td>'+newTraits[i][1]+'</td></tr>');        
    }

    $("#composition-actual-champs").empty();
    $("#composition-actual-champs").append('<table id="table-compo-champ"><thead><tr><th>Champion</th><th>Influence</th></tr></thead></table>');
    for (var i = newChamp.length - 1; i >= 0; i--) {
        $("#table-compo-champ").append('<tr class="table-compo"><td>'+newChamp[i][0]+'</td><td>'+newChamp[i][1]+'</td></tr>');        
    }

}

function updateCompositionSuggestion(){
    var traits=[];
    var champs=[];
    var aux;
    bagSug.forEach(function (val, key) {
        if (!bag.has(key)){
            aux = [key.attr('label/text'), val];
            //enrealidad no se sugieren traits.        
            if (key.attr('customAttr/type')=='trait'){
                traits.push(aux);
            }else if (key.attr('customAttr/type')=='champion'){
                champs.push(aux);
            }
        }
    });

    var newChamp = champs.sort(compare);

    $("#composition-suggestion-champs").empty();
    $("#composition-suggestion-champs").append('<table id="table-sugg-champ"><thead><tr><th>Champion</th><th>Influenced By</th></tr></thead></table>');
    for (var i = newChamp.length - 1; i >= 0; i--) {
        $("#table-sugg-champ").append('<tr class="table-sugg"><td>'+newChamp[i][0]+'</td><td>'+newChamp[i][1]+'</td></tr>');        
    }

}

function compare(a, b) {
 if (a[1] < b[1]) return -1;
 if (a[1] > b[1]) return 1;
 return 0;
}

////////////////////////////////////////////////////////////////////
///////////Navigation graph para agregar elementos a la composicion
////////////////////////////////////////////////////////////////////

//navega el grafo a partir de un Trait para agregarlo a la composicion.
function navigateTrait(element) {
    var newVal;
    var links = graphMain.getConnectedLinks(element);
    /*si el elemento tenia clickiados todos los elementos con los que se relaciona, 
    entonces hacerle click no realiza ningun cambio sobre los elementos directamente relacionados.*/
    var linksVisited = [];
    var cant = bag.has(element) ? bag.get(element) : 0;
    bag.set(element, links.length);
    element.attr('customAttr/isClicked',true);
    var auxelem;
    for (var i = links.length - 1; i >= 0; i--) {
        auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target());
        if (!links[i].attr('customAttr/isOnComposition') && !linksVisited.includes(links[i])){
            linksVisited.push(links[i]);
            onComposition.push(links[i]);
            auxelem.attr('customAttr/isClicked',true);
            if (!bagSug.has(auxelem)){
                bagSug.set(auxelem,links.length-1);
            }else{
                bagSug.set(auxelem,bagSug.get(auxelem)-cant+(links.length-1));
            }
            navigateChampionAux(auxelem,2, linksVisited);
        }else{
            if (!bagSug.has(auxelem)){
                bagSug.set(auxelem,links.length-1);
            }else{
                bagSug.set(auxelem,bagSug.get(auxelem)-(cant-1)+(links.length-1));
            }
        }
    }
}

//navega el grafo a partir de un Champion para agregarlo a la composicion.
function navigateChampion(element) {
    var newVal;
    var links = graphMain.getConnectedLinks(element);
    /*si el elemento tenia clickiados todos los elementos con los que se relaciona, 
    entonces hacerle click no realiza ningun cambio sobre los elementos directamente relacionados.*/
    var linksVisited = [];
    bag.set(element, links.length);
    element.attr('customAttr/isClicked',true);
    var auxelem;
    for (var i = links.length - 1; i >= 0; i--) {
        if (!links[i].attr('customAttr/isOnComposition') && !linksVisited.includes(links[i])){
            auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target());
            linksVisited.push(links[i]);
            onComposition.push(links[i]);
            //se agrega/actualiza el valor en bag.
            if (bag.has(auxelem)){
                bag.set(auxelem,bag.get(auxelem)+1);
            }else{
                bag.set(auxelem,1);
            }
            navigateTraitAux(auxelem,1, linksVisited);
        }
    }
}

//element debe ser un champion.
function navigateChampionAux(element, depth, linksVisited) {
    if (depth>0){
        linksVisitedAux = linksVisited.slice(0); //hace un clon.
        var links = graphMain.getConnectedLinks(element);
        bag.set(element, links.length);
        var auxelem;
        for (var i = links.length - 1; i >= 0; i--) {
            auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target()); 
            if (!linksVisitedAux.includes(links[i])){
                linksVisitedAux.push(links[i]);
                onComposition.push(links[i]);
                //se agrega/actualiza el valor en bag.
                if (bag.has(auxelem)){
                    bag.set(auxelem,bag.get(auxelem)+1);
                }else{
                    bag.set(auxelem,1);
                }
                navigateTraitAux(auxelem, depth-1, linksVisitedAux);
            }
        }
    }
}

//element debe ser un trait.
function navigateTraitAux(element, depth, linksVisited) {
    if (depth>0){
        linksVisitedAux = linksVisited.slice(0);
        var links = graphMain.getConnectedLinks(element);
        var auxelem;
        for (var i = links.length - 1; i >= 0; i--) {
            auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target()); 
            if (!linksVisitedAux.includes(links[i])){
                linksVisitedAux.push(links[i])
                //si auxelem (es un champ) no esta en el bag, se agrega con valor 1.
                if (!bagSug.has(auxelem)){
                    bagSug.set(auxelem,1);
                }else{
                    bagSug.set(auxelem,bagSug.get(auxelem)+1);
                }
                navigateChampionAux(auxelem, depth-1, linksVisitedAux);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////
///////////Navigation graph para eliminar elementos de la composicion
////////////////////////////////////////////////////////////////////

//navega el grafo a partir de un Trait para eliminarlo de la composicion.
function navigateTraitForDelete(element) {
    var newVal;
    var links = graphMain.getConnectedLinks(element);
    var linksVisited = [];
    /*si el elemento tenia clickiados todos los elementos con los que se relaciona, 
    entonces hacerle click no realiza ningun cambio sobre los elementos directamente relacionados.*/
    if (bag.has(element)){
        removeElem(element);
        var cantEnl = bag.get(element);
        bag.set(element,0);
        var auxelem;
        for (var i = links.length - 1; i >= 0; i--) {
            auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target());
            if (!linksVisited.includes(links[i])){
                linksVisited.push(links[i]);
                removeElem(links[i]);
                if (links[i].attr('customAttr/isOnComposition')){
                    removeElem(auxelem);
                    var res;
                    if(bagSug.has(auxelem)){
                        res = bagSug.get(auxelem)-(cantEnl-1);
                    }else{
                        res = 0;
                    }
                    bagSug.set(auxelem,res);
                    navigateChampionForDeleteAux(auxelem,2, linksVisited);
                }else{
                    var res;
                    if(bagSug.has(auxelem)){
                        res = bagSug.get(auxelem)-(cantEnl);
                        bagSug.set(auxelem,res);
                    }
                }
            }
        }
    }
}

//navega el grafo a partir de un Champion para eliminarlo de la composicion.
function navigateChampionForDelete(element) {
    var newVal;
    var links = graphMain.getConnectedLinks(element);
    linksVisited = [];
    removeElem(element);
    var auxelem;
    for (var i = links.length - 1; i >= 0; i--) {
        if (!linksVisited.includes(links[i])){
            linksVisited.push(links[i]);
            removeElem(links[i]);
            auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target());
            var res;
            if(bag.has(auxelem)){
                res = bag.get(auxelem)-1;
            }else{
                res = 0;
            }
            bag.set(auxelem,res);
            removeElem(auxelem);
            navigateTraitForDeleteAux(auxelem,1, linksVisited);
        }
    }
}

//element debe ser un champion.
function navigateChampionForDeleteAux(element, depth, linksVisited) {
    if (depth>0){
        var auxelem;
        var linksVisitedAux = linksVisited.slice(0);
        var links = graphMain.getConnectedLinks(element);
        for (var i = links.length - 1; i >= 0; i--) {
            if (!linksVisitedAux.includes(links[i])){
                linksVisitedAux.push(links[i]);
                removeElem(links[i]);
                auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target()); 
                var res;
                if(bag.has(auxelem)){
                    res = bag.get(auxelem)-1;
                }else{
                    res = 0;
                }
                bag.set(auxelem,res);
                removeElem(auxelem);
                navigateTraitForDeleteAux(auxelem, depth-1, linksVisitedAux);
            }
        }
    }
}

//element debe ser un trait.
function navigateTraitForDeleteAux(element, depth, linksVisited) {
    if (depth>0){
        var links = graphMain.getConnectedLinks(element);
        var auxelem;
        var linksVisitedAux = linksVisited.slice(0);

        for (var i = links.length - 1; i >= 0; i--) {
            if (!linksVisitedAux.includes(links[i])){
                linksVisitedAux.push(links[i]);
                auxelem = (links[i].source().id!=element.id) ? graphMain.getCell(links[i].source()) : graphMain.getCell(links[i].target()); 
                if(bagSug.has(auxelem)){
                    res = bagSug.get(auxelem)-1;
                    bagSug.set(auxelem,res);
                }
                navigateChampionForDeleteAux(auxelem,depth-1, linksVisitedAux);
            }
        }
    }
}

function removeElem(element) {
    if (!remove.includes(element)){
        remove.push(element);
    }
}

///////////////////////////////
/////////DEFINICIONES DE LINKS
///////////////////////////////

var createLink = function () {
    var myLink = new joint.shapes.standard.Link();

    myLink.attr({
        line: {
            stroke: '#d6d7d8',
            strokeWidth: 2,
            sourceMarker: {},
            targetMarker: {
                'd': ''
            }
        },
        customAttr:{
            "isOnComposition": false
        }
    });

    var verticesTool = new joint.linkTools.Vertices({
        snapRadius: 0,
        focusOpacity: 0.5,
    });
    var toolsView = new joint.dia.ToolsView({
        tools: [verticesTool]
    });

    var link = myLink.addTo(graphMain);
    var linkView = myLink.findView(paper);
    linkView.addTools(toolsView);
    return link;
};


var connectLink = function (myLink, elm1, elm2) {
    myLink.source({
        id: elm1.id
    });
    myLink.target({
        id: elm2.id
    });
};


///////////////////////////////////////////////////
///////////////////////////informacion de elementos
///////////////////////////////////////////////////
var ctrlPress = false;
$('body').keydown(function (evt) {
    //key ctrl
    ctrlPress = evt.which == 17;

});

$('body').keyup(function (evt) {
    //key ctrl
    ctrlPress = false;

});

//mostrar informacion de los elementos cuando el mouse se mueve encima de ellos
$('body').mousemove(function(evt) {
    if (ctrlPress){
        var point = new g.Point(evt.originalEvent.clientX, evt.originalEvent.clientY);
        var localpoint = paper.clientToLocalPoint(point);
        var element = graphMain.findModelsFromPoint(localpoint);
        if (element.length != 0){
            if (element[0].attr('customAttr/type')=='trait'){
                $('#champ-info').css({
                    display: "none"
                });
                showInfoTrait(element[0]);
            }else{
                $('#trait-info').css({
                    display: "none"
                });
                showInfoChamp(element[0]);
            }
        }
    }
});


function showInfoTrait(element) {
    $('#trait-info').css({
        display: "block"
    });
    $('#trait-name').text(element.attr('label/text'));
    var body;
    var type;
    var img;
    for (var i = infoTraits.length - 1; i >= 0; i--) {
        if (infoTraits[i].name==element.attr('label/text')){
            body = infoTraits[i].desc;
            type = infoTraits[i].type;
            img = infoTraits[i].img;
            break;
        }
    }
    $('#trait-name').text(element.attr('label/text'));
    $('#trait-type').text(type);
    $("#trait-img").attr("src",img);
    $('#trait-body').text(body);
}

function showInfoChamp(element) {
    $('#champ-info').css({
        display: "block"
    });
    $('#champ-name').text(element.attr('label/text'));
    var img;
    var cost;
    var elements;
    var cls;
    var ability;
    for (var i = json.length - 1; i >= 0; i--) {
        if (json[i].name==element.attr('label/text')){
            img = json[i].img;
            cost = json[i].cost;
            elements = json[i].elements;
            cls = json[i].class;
            ability = json[i].ability;
            break;
        }
    }
    $('#champ-name').text(element.attr('label/text'));
    $('#champ-cost').text("Cost: "+cost);
    $("#champ-img").attr("src",img);
    $('#champ-class-desc').text(cls);
    $('#champ-elements-desc').text(elements);
    $('#champ-ability-desc').text(ability.name+": "+ability.desc);
}
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

function showInstructions() {
    $('.container-instructions').css({
        display:"block",
    });
}

function hideInstructions() {
    $('.container-instructions').css({
        display:"none",
    });
}

function showContact(){
    $('.container-contact').css({
        display:"block",
    });   
}

function hideContact() {
    $('.container-contact').css({
        display:"none",
    });
}

function showAbout(){
    $('.container-about').css({
        display:"block",
    });   
}

function hideAbout() {
    $('.container-about').css({
        display:"none",
    });
}

function hidePub(select) {
    $('#'+select).css({
        display:"none",
    });
}

/*para que los div se acomoden al tamaño de la ventana*/
$(window).resize(function () {
    $("#paper").width($(window).width());
    $("#paper").height($(window).height());
});

infoTraits = [
{
    "name": "Crystal",
    "img": "imgs/elements_origins/crystal.png",
    "desc": "Desplegar a varios campeones de cristal les establece un límite máximo de daño que pueden recibir de un solo ataque o habilidad.",
    "type": "Element"
},{
    "name": "Electric",
    "img": "imgs/elements_origins/electric.png",
    "desc": "Desplegar a varios campeones eléctricos hace que inflijan daño a los enemigos adyacentes cada vez que asesten o reciban un golpe crítico.",
    "type": "Element"
},{
    "name": "Glacial",
    "img": "imgs/elements_origins/glacial.png",
    "desc": "Desplegar a varios campeones glaciales hace que haya una probabilidad de que sus ataques aturdan al objetivo. Esta probabilidad aumenta en función del número de campeones glaciales.",
    "type": "Element"
},{
    "name": "Inferno",
    "img": "imgs/elements_origins/inferno.png",
    "desc": "Desplegar a varios campeones infernales hace que sus habilidades quemen temporalmente el suelo bajo sus objetivos, lo que inflige daño a los enemigos que se encuentren en el fuego. El daño aumenta cuantos más campeones infernales haya.",
    "type": "Element"
},{
    "name": "Poison",
    "img": "imgs/elements_origins/poison.png",
    "desc": "Desplegar a varios campeones venenosos provoca que sus ataques y habilidades de daño aumenten el coste de maná de las habilidades de sus enemigos.",
    "type": "Element"
},{
    "name": "Desert",
    "img": "imgs/elements_origins/desert.png",
    "desc": "Desplegar a varios campeones del desierto reduce la armadura del equipo enemigo. La reducción aumenta si se despliegan más campeones del desierto.",
    "type": "Element"
},{
    "name": "Light",
    "img": "imgs/elements_origins/light.png",
    "desc": "Desplegar a varios campeones radiantes hace que, cuando mueran, curen a otros campeones radiantes un porcentaje de su vida máxima y les otorguen velocidad de ataque durante el resto de la ronda (se acumula con cada asesinato de campeones radiantes). La curación y el aumento de velocidad de ataque son mayores en función del número de campeones radiantes que haya desplegados.",
    "type": "Element"
},{
    "name": "Mountain",
    "img": "imgs/elements_origins/mountain.png",
    "desc": "Desplegar a varios campeones de montaña concede un enorme escudo a un aliado aleatorio al comienzo del combate.",
    "type": "Element"
},{
    "name": "Ocean",
    "img": "imgs/elements_origins/ocean.png",
    "desc": "Desplegar a varios campeones de océano otorga maná de forma periódica a los aliados. La cantidad aumenta con el número de campeones de océano.",
    "type": "Element"
},{
    "name": "Shadow",
    "img": "imgs/elements_origins/shadow.png",
    "desc": "Desplegar a varios campeones de sombra hace que inflijan más daño durante los primeros segundos del combate, así como durante unos segundos tras la muerte de un enemigo. Desplegar a más campeones de sombra hace que el daño de todos aumente cuando cualquiera de ellos participe en un asesinato.",
    "type": "Element"
},{
    "name": "Wind",
    "img": "imgs/elements_origins/wind.png",
    "desc": "Desplegar a los campeones de viento otorga probabilidad de esquivar a vuestro equipo.",
    "type": "Element"
},{
    "name": "Woodland",
    "img": "imgs/elements_origins/forest.png",
    "desc": "Desplegar a varios campeones de bosque hace que uno aleatorio de ellos cree una copia de sí mismo (incluidos los objetos) al comienzo del combate.",
    "type": "Element"
},{
    "name": "Steel",
    "img": "imgs/elements_origins/steel.png",
    "desc": "Desplegar a varios campeones de acero hace que se vuelvan inmunes al daño brevemente cuando bajen del 50 % de vida.",
    "type": "Element"
},{
    "name": "Avatar",
    "img": "imgs/elements_origins/avatar.png",
    "desc": "El elemento del avatar cuenta dos veces para las bonificaciones de los atributos.",
    "type": "Clase"
},{
    "name": "Ranger",
    "img": "imgs/elements_origins/ranger.png",
    "desc": "Desplegar a varios cazadores otorga, de forma periódica, una probabilidad de obtener una mejora de velocidad de ataque. Dicha probabilidad aumenta con más cazadores.",
    "type": "Clase"
},{
    "name": "Summoner",
    "img": "imgs/elements_origins/summoner.png",
    "desc": "Desplegar a varios invocadores aumenta la vida y la duración de los aliados que invocan, lo que aumenta con el número de invocadores. \nLas invocaciones se benefician de las bonificaciones de elemento y de clase, pero no cuentan como unidades adicionales para activar niveles más altos de dichas bonificaciones.",
    "type": "Clase"
},{
    "name": "Alchemist",
    "img": "imgs/elements_origins/alchemist.png",
    "desc": "Los alquimistas pueden moverse a través de otras unidades y nunca dejan de moverse.",
    "type": "Clase"
},{
    "name": "Assassin",
    "img": "imgs/elements_origins/assassin.png",
    "desc": "Los asesinos se desplazan sigilosamente por el campo de batalla al principio del combate y se colocan en el lugar opuesto a donde empezaron. \nDesplegar a varios asesinos les otorga probabilidad de impacto crítico y aumenta el daño de impacto crítico, lo que aumenta con más asesinos.",
    "type": "Clase"
},{
    "name": "Mystic",
    "img": "imgs/elements_origins/mystic.png",
    "desc": "Desplegar a varios místicos otorga resistencia mágica a todos los aliados, lo que aumenta con más místicos.",
    "type": "Clase"
},{
    "name": "Blademaster",
    "img": "imgs/elements_origins/blademaster.png",
    "desc": "Desplegar a varios espadachines hace que haya una probabilidad de que sus ataques impacten varias veces. Esta probabilidad aumenta en función del número de espadachines.",
    "type": "Clase"
},{
    "name": "Mage",
    "img": "imgs/elements_origins/mage.png",
    "desc": "Desplegar a varios magos les otorga una probabilidad de lanzar su habilidad dos veces. Esta probabilidad aumenta con más magos.",
    "type": "Clase"
},{
    "name": "Warden",
    "img": "imgs/elements_origins/warden.png",
    "desc": "Desplegar a varios centinelas les otorga armadura, que aumenta con más centinelas.",
    "type": "Clase"
},{
    "name": "Berserker",
    "img": "imgs/elements_origins/berserker.png",
    "desc": "Desplegar a varios berserkers otorga a sus ataques una probabilidad de infligir daño en un cono tras el objetivo. La probabilidad aumenta con más berserkers.",
    "type": "Clase"
},{
    "name": "Druid",
    "img": "imgs/elements_origins/druid.png",
    "desc": "Desplegar a dos druidas otorga a todos los druidas regeneración de vida.",
    "type": "Clase"
},{
    "name": "Predator",
    "img": "imgs/elements_origins/predator.png",
    "desc": "Desplegar a varios depredadores hace que sus ataques y habilidades ejecuten inmediatamente a los enemigos con poca vida.",
    "type": "Clase"
},{
    "name": "Variable",
    "img": "imgs/elements_origins/variable.png",
    "desc": "",
    "type": "Clase"
}
]

json = [{
    "img": "imgs/champions/Skarner.png",
    "cost": "2",
    "elements": ["Crystal"],
    "name": "Skarner",
    "ability": {
        "name": "NoInfo",
        "desc": "NoInfo"
    },
    "class": ["Predator"]
}, {
    "img": "imgs/champions/Ashe.png",
    "cost": "4",
    "elements": ["Crystal"],
    "name": "Ashe",
    "ability": {
        "name": "Ranger's Focus",
        "desc": "For five seconds, Ashe gains +50%\/75%\/100% attack speed and her auto attacks fire a five-arrow burst that inflicts 50%\/80%\/120% physical damage."
    },
    "class": ["Ranger"]
}, {
    "img": "imgs/champions/Taric.png",
    "cost": "5",
    "elements": ["Crystal"],
    "name": "Taric",
    "ability": {
        "name": "Cosmic Radiance",
        "desc": "After a delay, Taric and all nearby allies become invulnerable for a few seconds."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Renekton.png",
    "cost": "1",
    "elements": ["Desert"],
    "name": "Renekton",
    "ability": {
        "name": "Cull the Meek",
        "desc": "Renekton spins around, dealing 150\/275\/400 damage and healing for 150\/250\/350."
    },
    "class": ["Berserker"]
}, {
    "img": "imgs/champions/Azir.png",
    "cost": "3",
    "elements": ["Desert"],
    "name": "Azir",
    "ability": {
        "name": "Arise!",
        "desc": "Azir summons a sand soldier for six seconds, attacking whenever Azir does. Sand soldiers do 90\/180\/270 damage per attack to enemies in a line."
    },
    "class": ["Summoner"]
}, {
    "img": "imgs/champions/Sivir.png",
    "cost": "3",
    "elements": ["Desert"],
    "name": "Sivir",
    "ability": {
        "name": "Ricochet",
        "desc": "Sivir's auto attacks will bounce off enemies up to ten times for five seconds. The additional attacks deal 100\/135\/150% bonus damage, and apply on hit effects."
    },
    "class": ["Blademaster"]
}, {
    "img": "imgs/champions/Khazix.png",
    "cost": "4",
    "elements": ["Desert"],
    "name": "KhaZix",
    "ability": {
        "name": "Void Assault",
        "desc": "Kha'Zix goes into stealth and attacks the lowest health enemy after 2\/1.25\/0.5 seconds, gaining 100% crit chance for one attack and regaining 5\/10\/15 mana."
    },
    "class": ["Assassin"]
}, {
    "img": "imgs/champions/Ornn.png",
    "cost": "1",
    "elements": ["Electric"],
    "name": "Ornn",
    "ability": {
        "name": "Electric Breath",
        "desc": "Ornn unleashes lighting bolts in a cone in front of him, dealing 100\/200\/300 magic damage and increasing their chance of being critically struck by 20% for four seconds."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Zed.png",
    "cost": "5",
    "elements": ["Electric"],
    "name": "Zed",
    "ability": {
        "name": "Living Shadow",
        "desc": "Zed creates a shadow behind an enemy, which inherits the items and stats of the previous Zed. The shadow can then create a shadow of their own."
    },
    "class": ["Summoner", "Assassin"]
}, {
    "img": "imgs/champions/Ivern.png",
    "cost": "1",
    "elements": ["Woodland"],
    "name": "Ivern",
    "ability": {
        "name": "Triggerseed",
        "desc": "Ivern grants his lowest health ally a 200\/400\/600 damage shield that lasts for five seconds."
    },
    "class": ["Druid"]
}, {
    "img": "imgs/champions/Maokai.png",
    "cost": "1",
    "elements": ["Woodland"],
    "name": "Maokai",
    "ability": {
        "name": "Sap Magic",
        "desc": "After being hit by an enemy, Maokai's next basic attack will heal him for 100\/200\/300 health."
    },
    "class": ["Druid"]
}, {
    "img": "imgs/champions/LeBlanc.png",
    "cost": "2",
    "elements": ["Woodland"],
    "name": "LeBlanc",
    "ability": {
        "name": "Ethereal Chains",
        "desc": "LeBlanc throws a chain to a target, dealing 200\/450\/700 damage and snaring them for 1.5 seconds."
    },
    "class": ["Mage", "Assassin"]
}, {
    "img": "imgs/champions/Neeko.png",
    "cost": "2",
    "elements": ["Woodland"],
    "name": "Neeko",
    "ability": {
        "name": "Blooming Burst",
        "desc": "Three waves dealing 100\/200\/300 damage, with increasing range per wave."
    },
    "class": ["Druid"]
}, {
    "img": "imgs/champions/Warwick.png",
    "cost": "1",
    "elements": ["Glacial"],
    "name": "Warwick",
    "ability": {
        "name": "Infinite Duress",
        "desc": "Warwick dashes to the lowest health enemy, stunning them while dealing damage."
    },
    "class": ["Predator"]
}, {
    "img": "imgs/champions/Braum.png",
    "cost": "2",
    "elements": ["Glacial"],
    "name": "Braum",
    "ability": {
        "name": "Unbreakable",
        "desc": "Braum raises his shield towards the furthest enemy, reducing incoming damage and blocking projectiles."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Ezreal.png",
    "cost": "3",
    "elements": ["Glacial"],
    "name": "Ezreal",
    "ability": {
        "name": "Mystic Shot",
        "desc": "Ezreal targets the lowest health enemy champion, damaging and freezing them while applying other on-hit effects."
    },
    "class": ["Ranger"]
}, {
    "img": "imgs/champions/Olaf.png",
    "cost": "4",
    "elements": ["Glacial"],
    "name": "Olaf",
    "ability": {
        "name": "Berserker's Rage",
        "desc": "Olaf gains Crowd Control immunity, attack speed is increased by 75\/100\/125% and lifesteal increased by 20\/40\/60%."
    },
    "class": ["Berserker"]
}, {
    "img": "imgs/champions/Volibear.png",
    "cost": "2",
    "elements": ["Glacial", "Electric"],
    "name": "Volibear",
    "ability": {
        "name": "Furious Bite",
        "desc": "Deals 200\/450\/700 damage and executes the target if they are below 35% health. If target is executed, Volibear's mana is fully restored."
    },
    "class": ["Berserker"]
}, {
    "img": "imgs/champions/Zyra.png",
    "cost": "1",
    "elements": ["Inferno"],
    "name": "Zyra",
    "ability": {
        "name": "Flame Spitter",
        "desc": "Zyra summons two untargetable flame spitters on the corners of the arena, attacking the closest enemies."
    },
    "class": ["Summoner"]
}, {
    "img": "imgs/champions/Diana.png",
    "cost": "2",
    "elements": ["Inferno"],
    "name": "Diana",
    "ability": {
        "name": "Pale Cascade",
        "desc": "Diana creates three orbs which explode and deal 60\/100\/140 damage each when they hit an enemy. Additionally, she also gains a 150\/250\/350 health shield for three seconds."
    },
    "class": ["Assassin"]
}, {
    "img": "imgs/champions/Varus.png",
    "cost": "2",
    "elements": ["Inferno"],
    "name": "Varus",
    "ability": {
        "name": "Piercing Arrow",
        "desc": "Varus charges up an arrow that pierces through enemies in a line, dealing damage."
    },
    "class": ["Ranger"]
}, {
    "img": "imgs/champions/Kindred.png",
    "cost": "3",
    "elements": ["Inferno", "Shadow"],
    "name": "Kindred",
    "ability": {
        "name": "Dance of Arrows",
        "desc": "Kindred dashes across the board, dealing 150\/325\/500 magic damage to a unit."
    },
    "class": ["Ranger"]
}, {
    "img": "imgs/champions/Annie.png",
    "cost": "4",
    "elements": ["Inferno"],
    "name": "Annie",
    "ability": {
        "name": "Tibbers!",
        "desc": "Summon Tibbers to deal 100\/200\/300 damage to an area. Tibbers deals 150\/300\/999 magic damage with his auto-attacks."
    },
    "class": ["Summoner"]
}, {
    "img": "imgs/champions/Nasus.png",
    "cost": "1",
    "elements": ["Light"],
    "name": "Nasus",
    "ability": {
        "name": "Fury of the Dawn",
        "desc": "Nasus temporarily enrages, gaining bonus health and damaging adjacent enemies for the duration."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Vayne.png",
    "cost": "1",
    "elements": ["Light"],
    "name": "Vayne",
    "ability": {
        "name": "Silver Bolts",
        "desc": "After stacking three auto attacks, Silver Bolts will deal additional true damage to an enemy."
    },
    "class": ["Ranger"]
}, {
    "img": "imgs/champions/Jax.png",
    "cost": "2",
    "elements": ["Light"],
    "name": "Jax",
    "ability": {
        "name": "Counter Strike",
        "desc": "Jax dodges all auto attacks for two seconds, then stuns all nearby enemies for 1.5 seconds, dealing 150\/250\/350 damage."
    },
    "class": ["Berserker"]
}, {
    "img": "imgs/champions/Aatrox.png",
    "cost": "3",
    "elements": ["Light"],
    "name": "Aatrox",
    "ability": {
        "name": "The Darkin Blade",
        "desc": "Aatrox cleaves the area in front of him, dealing damage to enemies inside of it."
    },
    "class": ["Blademaster"]
}, {
    "img": "imgs/champions/Soraka.png",
    "cost": "3",
    "elements": ["Light"],
    "name": "Soraka",
    "ability": {
        "name": "Equinox",
        "desc": "Soraka creates a zone, silencing enemies for 3\/5\/7 seconds and dealing 150\/300\/450 damage."
    },
    "class": ["Mystic"]
}, {
    "img": "imgs/champions/Yorick.png",
    "cost": "4",
    "elements": ["Light"],
    "name": "Yorick",
    "ability": {
        "name": "Shepherd of Souls",
        "desc": "Yorick blesses 3\/5\/10 non-Light allies. When these allies die, they resurrect as Ghouls with 500\/900\/2000 health and 75\/150\/225 attack damage. Ghouls also benefit from the Light buff."
    },
    "class": ["Summoner"]
}, {
    "img": "imgs/champions/Taliyah.png",
    "cost": "1",
    "elements": ["Mountain"],
    "name": "Taliyah",
    "ability": {
        "name": "Seismic Shove",
        "desc": "Taliyah causes the ground to rise up under the enemy with the most mana, dealing 150\/325\/500 damage. If the enemy is ranged, they are thrown towards Taliyah. If the enemy is melee, they are thrown away."
    },
    "class": ["Mage"]
}, {
    "img": "imgs/champions/Malphite.png",
    "cost": "4",
    "elements": ["Mountain"],
    "name": "Malphite",
    "ability": {
        "name": "Unstoppable Force",
        "desc": "Malphite charges at a random enemy, dealing 125\/200\/275 damage and knocking all nearby enemies into the air, stunning them for 2\/2.5\/3 seconds."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Vladimir.png",
    "cost": "1",
    "elements": ["Ocean"],
    "name": "Vladimir",
    "ability": {
        "name": "Drain",
        "desc": "Vladimir damages a target enemy for \/\/ damage, healing himself for the damage dealt."
    },
    "class": ["Mage"]
}, {
    "img": "imgs/champions/Syndra.png",
    "cost": "2",
    "elements": ["Ocean"],
    "name": "Syndra",
    "ability": {
        "name": "Hydro Sphere",
        "desc": "Syndra conjures a Hydro Sphere at a target location, dealing \/\/ damage to enemies."
    },
    "class": ["Mage"]
}, {
    "img": "imgs/champions/Thresh.png",
    "cost": "2",
    "elements": ["Ocean"],
    "name": "Thresh",
    "ability": {
        "name": "Deep Sea Passage",
        "desc": "Thresh throws his lantern to the lowest-health ally, shielding them and nearby allies for a few seconds."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Nautilus.png",
    "cost": "3",
    "elements": ["Ocean"],
    "name": "Nautilus",
    "ability": {
        "name": "Depth Charge",
        "desc": "Nautilus sends out a depth charge to the further enemy, knocking them up and stunning them."
    },
    "class": ["Warden"]
}, {
    "img": "imgs/champions/Nami.png",
    "cost": "5",
    "elements": ["Ocean"],
    "name": "Nami",
    "ability": {
        "name": "NoInfo",
        "desc": "NoInfo"
    },
    "class": ["Mystic"]
}, {
    "img": "imgs/champions/KogMaw.png",
    "cost": "1",
    "elements": ["Poison"],
    "name": "KogMaw",
    "ability": {
        "name": "Living Artillery",
        "desc": "After a short delay, a projectile lands on a random enemy, dealing 125\/275\/425 damage."
    },
    "class": ["Predator"]
}, {
    "img": "imgs/champions/DrMundo.png",
    "cost": "3",
    "elements": ["Poison"],
    "name": "Dr. Mundo",
    "ability": {
        "name": "Burning Agony",
        "desc": "Dr. Mundo makes a circle around him, dealing 40\/110\/160 (+1.25% maximum health) magic damage and heals for 100%\/150%\/200%"
    },
    "class": ["Berserker"]
}, {
    "img": "imgs/champions/Twitch.png",
    "cost": "4",
    "elements": ["Poison"],
    "name": "Twitch",
    "ability": {
        "name": "Spray and Pray",
        "desc": "Twitch gets unlimited range and 100\/125\/150% attack damage. All of his attacks pierce targets and apply on-hit effects."
    },
    "class": ["Ranger"]
}, {
    "img": "imgs/champions/Singed.png",
    "cost": "5",
    "elements": ["Poison"],
    "name": "Singed",
    "ability": {
        "name": "Poison Trail",
        "desc": "Singed leaves a trail of poison behind him, dealing 400\/800\/1200 damage over four seconds."
    },
    "class": ["Alchemist"]
}, {
    "img": "imgs/champions/Malzahar.png",
    "cost": "2",
    "elements": ["Shadow"],
    "name": "Malzahar",
    "ability": {
        "name": "Dark Spirits",
        "desc": "Opens a dark gate summoning 2\/3\/4 Dark Spirits. Spirits deal 60\/100\/140 damage per attack."
    },
    "class": ["Summoner"]
}, {
    "img": "imgs/champions/Veigar.png",
    "cost": "3",
    "elements": ["Shadow"],
    "name": "Veigar",
    "ability": {
        "name": "Primordial Burst",
        "desc": "Veigar blasts an enemy with magical energy, dealing damage. Instantly kills enemies at lower star levels than Veigar."
    },
    "class": ["Mage"]
}, {
    "img": "imgs/champions/MasterYi.png",
    "cost": "5",
    "elements": ["Shadow"],
    "name": "Master Yi",
    "ability": {
        "name": "NoInfo",
        "desc": "NoInfo"
    },
    "class": ["Mystic", "Blademaster"]
}, {
    "img": "imgs/champions/RekSai.png",
    "cost": "2",
    "elements": ["Steel"],
    "name": "RekSai",
    "ability": {
        "name": "Furious Bite",
        "desc": "Rek'Sai deals 200\/550\/900 true damage to an enemy."
    },
    "class": ["Predator"]
}, {
    "img": "imgs/champions/Nocturne.png",
    "cost": "3",
    "elements": ["Steel"],
    "name": "Nocturne",
    "ability": {
        "name": "Umbra Blades",
        "desc": "Every third attack does area of effect damage, healing for 75%\/100%\/125 of damage dealt."
    },
    "class": ["Assassin"]
}, {
    "img": "imgs/champions/Yasuo.png",
    "cost": "2",
    "elements": ["Wind"],
    "name": "Yasuo",
    "ability": {
        "name": "Last Breath",
        "desc": "Yasuo blinks towards the target with the most items equipped, knocking them up for one second and hitting them 3\/5\/7 times."
    },
    "class": ["Blademaster"]
}, {
    "img": "imgs/champions/Janna.png",
    "cost": "4",
    "elements": ["Wind"],
    "name": "Janna",
    "ability": {
        "name": "Monsoon",
        "desc": "Janna casts a wind blast that lasts for three seconds, healing allies for 30%\/40%\/80% of their maximum health and stunning enemies for one second."
    },
    "class": ["Mystic"]
}, {
    "img": "imgs/champions/Qiyana.png",
    "cost": "3",
    "elements": ["Variable"],
    "name": "Qiyana",
    "ability": {
        "name": "Edge of Ixtal",
        "desc": "Qiyana dashes to the side of her target and throws a blast of wind through them, damaging and stunning enemies it passes through."
    },
    "class": ["Assassin"]
}, {
    "img": "imgs/champions/Lux.png",
    "cost": "7",
    "elements": ["Variable"],
    "name": "Lux",
    "ability": {
        "name": "Final Spark",
        "desc": "Inflicts 600\/900\/1200 magic damage and restores 50 mana on kill"
    },
    "class": ["Avatar"]
},{
    "img": "imgs/champions/Brand.png",
    "cost": "4",
    "elements": ["Inferno"],
    "name": "Brand",
    "ability": {
        "name": "Detonación ígnea",
        "desc": "Brand lanza una bola de fuego rebotante que daña a los enemigos alcanzados."
    },
    "class": ["Mage"]
},{
    "img": "imgs/champions/Sion.png",
    "cost": "3",
    "elements": ["Shadow"],
    "name": "Sion",
    "ability": {
        "name": "Impacto aniquilador",
        "desc": "Sion golpea un área frente a él tras una pausa, levantando a sus enemigos por los aires y dañándolos."
    },
    "class": ["Berserker"]
}];

$("#paper").ready(function(){
  loadGraph();
  $("#txtSearchChamp").val('');
});