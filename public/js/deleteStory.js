const deleteStory = (btn) =>{
    const storyId = btn.parentNode.querySelector('[name=id');
    const csrf = btn.parentNode.querySelector('[name=_csrf]')
    const storyElement = btn.closest('tr'); //

    console.log(storyId,csrf);

    fetch('/dashboard/' + storyId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf,
        }
    })
    .then((result)=>{
        console.log(result);
    })
    .then((data)=>{
        console.log(data);
        storyElement.parentNode.removeChild(storyElement);
    })
    .catch((err) =>{
        console.log(err);
    })
}