function getNewStudent(){
    $.ajax({
        url: '/students',
        type:'GET',
        dataType: 'json'
    }).done(function(response, textStatus, jqXHR){
        console.log(response);
        appendNewStudent(response);

    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    }).always(function(){
        console.log('I done made the call!');
    });
}

function appendNewStudent(student){
    console.log(student);
    var template = Handlebars.compile(source);
    $('#contents').append(template(student,{"student":student}));

}

$(document).ready(function(){
    source = $('#studentTemplate').html();
    $('form').on('submit',function(e){
        e.preventDefault();
        var firstName = $(this).serializeArray()[0].value;
        var lastName = $(this).serializeArray()[1].value;
        //console.log(firstName,lastName);
        var newStudent = {
            firstName: firstName,
            lastName: lastName
        };

        $.ajax({
            url: '/students',
            type:'POST',
            data: newStudent,
            dataType: 'json'
        }).done(function(response, textStatus, jqXHR){
            getNewStudent();

        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            console.log('I done made the call!');
        });
    });
});