function changeScrOfIconBySprite($svg, src){
    $use = $($svg).children()[0]
    $use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
}
