// We add some classes to the body tag to restore the sidebar to the state is was before reload.
// That state was saved to localstorage by userPreferencesPersistor.js
// We need to apply the classes BEFORE the page is rendered. 
// That is why we use a MutationObserver instead of document.Ready().
var observer = new MutationObserver(function (mutations) {
    var adminPreferences = JSON.parse(localStorage.getItem('adminPreferences'));

    for (var i = 0; i < mutations.length; i++) {
        for (var j = 0; j < mutations[i].addedNodes.length; j++) {
            
            if (mutations[i].addedNodes[j].tagName == 'BODY') {

                var body = mutations[i].addedNodes[j];

                if (adminPreferences != null) {
                    if (adminPreferences.leftSidebarCompact == true) {
                        body.classList.add('left-sidebar-compact');
                    }
                    isCompactExplicit = adminPreferences.isCompactExplicit;

                    if(adminPreferences.darkMode){
                        document.getElementById('admin-darkmode').setAttribute('media', 'all');
                        document.getElementById('admin-default').setAttribute('media', 'not all');
                        body.classList.add('darkmode');
                        
                        document.getElementById('btn-darkmode').firstChild.classList.remove('fa-moon');
                        document.getElementById('btn-darkmode').firstChild.classList.add('fa-sun');
                    }
                    else
                    {
                        document.getElementById('admin-darkmode').setAttribute('media', 'not all');
                        document.getElementById('admin-default').setAttribute('media', 'all');
                        body.classList.remove('darkmode');

                        document.getElementById('btn-darkmode').firstChild.classList.remove('fa-sun');
                        document.getElementById('btn-darkmode').firstChild.classList.add('fa-moon');
                    }
                } else {
                    body.classList.add('no-admin-preferences');

                    // Automatically sets darkmode based on OS preferences
                    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                    {
                        document.getElementById('admin-darkmode').setAttribute('media', 'all');
                        document.getElementById('admin-default').setAttribute('media', 'not all');
                        body.classList.add('darkmode');

                        document.getElementById('btn-darkmode').firstChild.classList.remove('fa-moon');
                        document.getElementById('btn-darkmode').firstChild.classList.add('fa-sun');
                    }
                    else
                    {
                        body.classList.remove('darkmode');

                        document.getElementById('btn-darkmode').firstChild.classList.remove('fa-sun');
                        document.getElementById('btn-darkmode').firstChild.classList.add('fa-moon');
                    }
                }

                // we're done: 
                observer.disconnect();
            };
        }
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
