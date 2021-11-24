const $tags_items = $('.button-tags__item')

$tags_items.on({
    click:(e)=>{
        $btn = $(e.target).parent().prev()[0]
        console.log($btn);
        $btn.innerText = e.target.innerText
        $btn.style = 'width:fit-content'
        $($btn).removeClass('button-tags_unselected')
    }
})