$(document).ready(function() {
    $("#openDrawer").click(function(){
         $(".drawer").css({ 'right': '0px', 'left': '' }).animate({
                             'width' : '33%'
                         });
         $(".drawer-backdrop").removeClass("hide");
         $('body').css({overflow:'hidden'});
    });
    $('.closeDrawer').click(function(){
      $(".drawer").css({ 'right': '', 'left': '' }).animate({
           'right' : '-33%'
       });
      $(".drawer-backdrop").addClass("hide");
      $('body').css({overflow:'auto'});
    });
});