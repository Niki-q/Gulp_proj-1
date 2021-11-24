// Const
const regex_phone = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/)

const regexlist = {
    'tel':new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i),
    'email':new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
    'text':new RegExp(/./),
}
let spritepath = 'svg/stack/'
const activateclass = 'text-field_activated'
const errorclass = 'text-field_error'
const cleanclass = 'text-field_potential-clean'
const inactiveclass = 'text-field_inactive'
const promoclass = 'text-field-small_promo'

const pathiconlist = {
    'text-field_activated':`${spritepath}icons.svg#outline-check-24pxcheck`,
    'text-field_error':`${spritepath}icons.svg#outline-close-24pxcross`,
    'text-field_potential-clean':`${spritepath}icons.svg#outline-check-24pxclose`,
    'text-field_inactive':``,
    'text-field-small_promo':`${spritepath}icons.svg#inactivepromo`
}


// Nodes

const $tf_ordinary = $('.input.text-field-ordinary__input')

// Getter

const getInputNodes = ($input) =>{
    const nodes = {};
    nodes.$input = $input
    nodes.$parent = $($input).parent()[0]
    nodes.value = $($input).val()
    nodes.$icon = $($input).parent()[0].lastElementChild
    return nodes
}


// Ordinary text field

// Transform

function getActivate (nodes){
    if (regexlist[$(nodes.$input).prop('type')].test(nodes.value)) {
        $(nodes.$parent).removeClass(inactiveclass)
        $(nodes.$parent).removeClass(errorclass)
        changeScrOfIconBySprite(nodes.$icon, pathiconlist[activateclass])
        $(nodes.$parent).addClass(activateclass)
        nodes.$icon.style.animationPlayState = 'running'
    }
}
function getError (nodes){
    if (!regexlist[$(nodes.$input).prop('type')].test(nodes.value)) {
        $(nodes.$parent).removeClass(inactiveclass)
        $(nodes.$parent).removeClass(activateclass)
        $(nodes.$parent).addClass(errorclass)
        changeScrOfIconBySprite(nodes.$icon, pathiconlist[errorclass])
        nodes.$icon.style.animationPlayState = 'running'
    }
}
function getClean (nodes){
    $(nodes.$parent).removeClass(inactiveclass)
    changeScrOfIconBySprite(nodes.$icon, pathiconlist[cleanclass])
    $(nodes.$parent).addClass(cleanclass)
    nodes.$icon.style.animationPlayState = 'running'
}

function removeClean (nodes){
    $(nodes.$parent).removeClass(cleanclass)
    $(nodes.$parent).addClass(inactiveclass)
    // $(nodes.$parent).addClass(promoclass)
    // changeScrOfIconBySprite(nodes.$icon, pathiconlist[promoclass])
    // nodes.$icon.style.animationPlayState = 'running'
}

const hardCheck = (nodes) =>{
    getActivate(nodes)
    getError(nodes)
}


const uncheck = (nodes) =>{
    $(nodes.$parent).removeClass(activateclass)
    $(nodes.$parent).removeClass(errorclass)
    $(nodes.$parent).removeClass(cleanclass)
    $(nodes.$parent).addClass(inactiveclass)
}

// Listener

$tf_ordinary.on({
    focus:(e)=> {
        const nodes = getInputNodes(e.target)
        $(nodes.$input).css({
            margin:'11px 0 0'
        })
    },
    blur:(e)=>{
        const nodes = getInputNodes(e.target)
        if (nodes.value.length === 0 ){
            $(nodes.$input).css({
                margin:'0 0'
            })
            uncheck(nodes)
        }
        else{hardCheck(nodes)}
    },
    keyup:(e)=>{
        const nodes = getInputNodes(e.target)
        if ($(nodes.$parent).hasClass(errorclass)){
            getActivate(nodes)
        }
    }
})

// Small text field

const $tf_small = $('.input.text-field-small__input')

// Listener

$tf_small.on({
    blur:(e)=>{
        const nodes = getInputNodes(e.target)
        removeClean(nodes)
        if(nodes.value === ''){
            uncheck(nodes)
        }
        else{getError(nodes)}
    },
    focus:(e)=> {
        const nodes = getInputNodes(e.target)
        if(nodes.value !== '')
            getClean(nodes)
        $tf_small.on({
            keyup:(e)=>{
            const nodes = getInputNodes(e.target)
            let i = 0;
            if(nodes.value === '' && i === 0){
                removeClean(nodes)
                i++
            }
            else{
                if(!$(nodes.$parent).hasClass(cleanclass) && i === 0){
                    getClean(nodes)
                }
                $($tf_small).next().next().on({
                    click:(e)=>{
                        const nodes = getInputNodes($(e.target).prev().prev())
                        $(nodes.$input).val('')
                        removeClean(nodes)
                        nodes.$input.blur().focus()
                    }
                })
            }
        }})
    },
})
