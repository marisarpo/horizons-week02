$(document).ready(function(){
  let children = $('ul').children();
  console.log('children: ', typeof(children));
  $('ul').on('click','li', function(){
    console.log('clicked.');
    let index = 0;
    for(let child in children){
      if (!children.hasOwnProperty(child)) continue;
      console.log('looping', child);
      if(children[child] === this){
        $('span').text('That was index ' + index)
        console.log('index: ', index);
        break;
      }
      index++;
    }
  })
});
