const deleteStory = (btn) =>{
<<<<<<< HEAD
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
=======
    const storyId = btn.parentNode.querySelector('[name=storyId');
    console.log(storyId);
>>>>>>> 7822e17bcf40023cf4d423060795db32d826b059
}