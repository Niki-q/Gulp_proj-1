const $btn_switchable = $('.button_switchable')

let icons = {
    path:'svg/stack/',
    file:'icons.svg#'
}
src = icons.path + icons.file
const list_of_path_for_icons = {
    'button-add-to-bag': {
        inactive: `${src}inactive_bag_icon`,
        activate: `${src}activated_bag_icon`
    },
    'button-add-to-favorites':{
        inactive: `${src}inactive_icon_favorites_`,
        activate: `${src}activated_icon_favorites_activated`
    }
}

$btn_switchable.on({
    click: (e)=>{
        $svg = $(e.target).children()[0]
        $(e.target).toggleClass('button_activated')
        for (element in list_of_path_for_icons){
            if ($(e.target).hasClass(element))
                category_class = element
        }
        if($(e.target).hasClass('button_activated'))
            changeScrOfIconBySprite($svg,list_of_path_for_icons[category_class].activate)
        else
            changeScrOfIconBySprite($svg,list_of_path_for_icons[category_class].inactive)
    },
    activate:(e)=>{
        console.log(1)
    }
})