// Const
const regex_phone = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/)

const regexlist = {
    'tel':new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/),
    'email':new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
    'text':new RegExp(/./),
}
const pathiconlist = {
    'text-field_activated':'svg/stack/dist/svg/icons.svg#outline-check-24pxcheck',

}
// Nodes

const $textfield = $('.input.text-field-ordinary__input')


// Transform

const activate = (e) =>{
    $input = $(e.target)
    $parentlabel =  $($input).parent()
    $icon = $parentlabel[0].lastElementChild
    $use = $icon[0].lastElementChild
    value = $($input).val()

    if (regexlist[$($input).prop('type')].test(value)){
        console.log(1);
        $parentlabel.addClass('text-field_activated')
        $icon.style.animationPlayState = 'running'
    }
    else{
        $parentlabel.removeClass('text-field_activated')
    }
}


// Listener

$textfield.on({
    focus:(e)=> {
        $(e.target).css({
            margin:'14px 0 0'
        })
    },
    blur:(e)=>{
        if ($(e.target).val().length === 0 )
            $(e.target).css({
                margin:'0 0'
            })
        activate(e)
    }
})


//https://prometheus.org.ua/cs50web_2021/notes6.html#animation

// галочка показывается а крест меняет ссылку
