import settings from '../../settings.json' assert { type: "json" };

if (settings.loading) {
    if (settings.load_type === "1") {
        classManager('load', 'hide_no_effect', 'remove');
    } else if (settings.load_type === "2") {
        classManager('load_2', 'hide_no_animation', 'remove');
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        if (settings.loading) {
            if (settings.load_type === "1") {
                setTimeout(function () {
                    classManager('load', 'hide');
                }, 2000);
            } else if (settings.load_type === "2") {
                setTimeout(function () {
                    classManager('load_bar', 'success');
        
                    setTimeout(function () {
                        classManager('load_2', 'hide');
        
                        setTimeout(function () {
                            classManager('load_bar', 'success', 'remove');
                        }, 400);
                    }, 200);
                }, 400);
            }
        }
    }
};

if (settings.light_mode) {
    if (!settings.profile_theme.enabled) {
        classManager('switch_mode', 'light');
        classManager('switch_ver', 'light');
        getId('switch_mode').innerHTML = `<i class="fas fa-sun"></i>`;
    }
} else {
    if (!settings.profile_theme.enabled) {
        getId('switch_mode').innerHTML = `<i class="fas fa-moon"></i>`;
    }
}

if (settings.old_version) {
    classManager('card', 'old_ver');
    classManager('switch_ver', 'focused');
}

if (settings.avatar_decoration.enabled) {
    classManager('_av_decoration', 'active');
    getId('_av_decoration').setAttribute('decoration_type', settings.avatar_decoration.type);
}

if (settings.profile_theme.enabled && !settings.old_version) {
    classManager('card', 'profile_theme');

    getId('switch_mode').style.display = 'none';

    getId('switch_ver').style.display = 'none';

    getId('card').setAttribute('style',
        '--primary:' + settings.profile_theme.primary
        + ';' +
        '--accent:' + settings.profile_theme.accent 
        + ';'
    )
}

if (getId('badges').childElementCount >= 4) {
    classManager('badges', 'has-4-child');
}

click('switch_mode', function () {
    if (classManager('card', 'light-theme', 'find')) {
        classManager('card', 'light-theme', 'remove');
        classManager('switch_mode', 'light', 'remove');
        classManager('switch_ver', 'light', 'remove');
        getId('switch_mode').innerHTML = `<i class="fas fa-moon"></i>`;
    } else {
        classManager('card', 'light-theme');
        classManager('switch_mode', 'light');
        classManager('switch_ver', 'light');
        getId('switch_mode').innerHTML = `<i class="fas fa-sun"></i>`;
    }
});

click('switch_ver', function () {
    if (classManager('card', 'old_ver', 'find')) {
        classManager('card', 'old_ver', 'remove');
        classManager('switch_ver', 'focused', 'remove');
    } else {
        classManager('card', 'old_ver');
        classManager('switch_ver', 'focused');
    }
});

var badges = document.getElementsByClassName("badge");

var hover_tooltip_1 = function() {
    this.querySelector('.badge_tooltip').classList.add('show');
};

var hover_tooltip_2 = function() {
    this.querySelector('.badge_tooltip').classList.remove('show');
};

for (var i = 0; i < badges.length; i++) {
    badges[i].addEventListener('mouseenter', hover_tooltip_1, false);
}

for (var i = 0; i < badges.length; i++) {
    badges[i].addEventListener('mouseleave', hover_tooltip_2, false);
}

if (settings.light_mode) {
    classManager('card', 'light-theme');
}

function getId(id) {
    return document.getElementById(id);
}

function click(id, event) {
    if (getId(id)) {
        getId(id).addEventListener('click', event);
    }
}

function classManager(id, classname, type = 'add') {
    switch (type) {
        case 'add':
            return getId(id).classList.add(classname);
        case 'remove':
            return getId(id).classList.remove(classname);
        case 'find':
            return getId(id).classList.contains(classname);
        default:
            return false;
    }
}