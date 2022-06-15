const showAllTabs = () => {
  document.querySelector('#widget-nav-tab').style.display = 'block';
  document.querySelector('#leaderboard-nav-tab').style.display = 'block';
  document.getElementById('profile-tab-label').style.display = 'none';
  document.querySelector('#widget-tab').click();
};

const updateUserProfile = ({ fullName, email, nickname }) => {
  LiveLike.updateUserProfile({
    accessToken: LiveLike.userProfile.access_token,
    options: {
      nickname: nickname,
      custom_data: JSON.stringify({
        fullName: fullName,
        email: email,
      }),
    },
  })
    .then((res) => {
      localStorage.setItem('ProfileIsValid', true);
      refreshProfileData();
      showAllTabs();
    })
    .catch((err) => {
      console.warn(err);
    });
};

const refreshProfileData = () => {
  document.querySelector('#profile-tab-label').innerHTML = `Profile`;
  document.querySelector('#form-user-nickName').value =
    LiveLike.userProfile.nickname;
  var customData = JSON.parse(LiveLike.userProfile.custom_data);
  if (customData) {
    if (customData.fullName) {
      document.querySelector('#form-user-fullName').value = customData.fullName;
    }
    if (customData.email) {
      document.querySelector('#form-user-email').value = customData.email;
    }
  }
  performUserFormValidation();
};

const handleCreateUserProfile = (e) => {
  if (profileIsValid()) {
    updateUserProfile({
      fullName: document.querySelector('#form-user-fullName').value,
      email: document.querySelector('#form-user-email').value,
      nickname: document.querySelector('#form-user-nickName').value,
    });
  }
};

const setupLeaderboard = (leaderboardId) => {
  const buildProfileRank = (leaderboardId) => {
    return LiveLike.getLeaderboardProfileRank({
      leaderboardId,
      profileId: LiveLike.userProfile.id,
    })
      .then((profileRank) => {
        // If rank and points element already exist, update their values
        const ptsEl = document.querySelector('#user-profile-points');
        ptsEl.innerHTML = `${profileRank.score} Pts.`;
      })
      .catch(() => console.log('Current user not a part of leaderboard yet.'));
  };

  const buildLeaderboard = (leaderboardId) => {
    LiveLike.getLeaderboardEntries({
      leaderboardId,
    }).then((lb) => {
      const lbContainer = document.querySelector(
        '.leaderboard-entries-container'
      );

      // If leaderboard items already exist, remove them to re-build on leaderboard update
      lbContainer.children.length > 0 &&
        Array.from(lbContainer.children).forEach((el) => el.remove());

      // Get current profile results
      const currentProfileEntry = lb.entries.find(
        (x) => x.profile_id == LiveLike.userProfile.id
      );
      if (currentProfileEntry) {
        if (currentProfileEntry.rank >= 10) {
          lb.entries.unshift(currentProfileEntry);
        }
      } else {
        lb.entries.unshift({
          profile_id: LiveLike.userProfile.id,
          rank: '',
          score: 0,
        });
      }

      // Loop through leaderboard entries to create list items for each entry
      lb.entries = lb.entries.slice(0, 10);
      lb.entries.forEach((entry) => {
        const entryRow = document.createElement('tr');
        entryRow.setAttribute('class', 'list-item');
        if (entry.profile_id === LiveLike.userProfile.id) {
          entry.profile_nickname = 'Me';
          entryRow.setAttribute('class', 'list-item current-profile-list-item');
        }
        entryRow.innerHTML = `
<td class="rank">${entry.rank}</td>
<td class="name">${entry.profile_nickname}</td>
<td class="pts">${entry.score}</td>
          `;
        lbContainer.appendChild(entryRow);
      });
    });
  };


  const updateLeaderboardData = () => {
    buildLeaderboard(leaderboardId);
    buildProfileRank(leaderboardId);
  };
  if (leaderboardId) {
    // When a widget is dismissed, we update the leaderboard to show updated ranks and points
    const evts = ['vote', 'answer', 'prediction', 'cheer', 'slider', 'beforewidgetdetached'];
    evts.forEach(evt => document.addEventListener(evt, updateLeaderboardData));

    document.addEventListener('rankchange', (data) => {
        updateLeaderboardData();
        if (data.detail.rewards.length) {
          const ptsEl = document.querySelector('#user-profile-points');
          ptsEl.classList.add('bounce');
          setTimeout(() => ptsEl.classList.remove('bounce'), 1200);
        }
    });
  }
  updateLeaderboardData();
};

const showProfileTab = () => {
  document.querySelector('#widget-nav-tab').style.display = 'none';
  document.querySelector('#leaderboard-nav-tab').style.display = 'none';

  document.getElementById('profile-tab-label').click();
};

const profileIsValid = () => {
  const value = localStorage.getItem('ProfileIsValid');
  if (value) {
    return true;
  }

  const fullName = document.querySelector('#form-user-fullName').value;
  const nickname = document.querySelector('#form-user-nickName').value;
  const email = document.querySelector('#form-user-email').value;

  if (fullName && email && nickname) {
    return true;
  }

  return false;
};

const performUserFormValidation = () => {
  if (profileIsValid()) {
    document.querySelector('#createProfileButton').removeAttribute('disabled');
  } else {
    document
      .querySelector('#createProfileButton')
      .setAttribute('disabled', 'disabled');
  }
};

const showProfileTabIfFirstTimeVisiting = () => {
  performUserFormValidation();
  if (!profileIsValid()) {
    showProfileTab();
  } else {
    document.getElementById('profile-nav-tab').style.display = 'none';
  }
};

const getDuration = (str) => {
  const time = parseInt(str.substring(4, 6)) * 60 * 60 + parseInt(str.substring(7, 9)) * 60 + parseInt(str.substring(10, 12))
  // console.log(time)
  return time;
}

const setWidgetInteraction = (interaction, widget) => {
  const optionOrChoice = interaction.option_id || interaction.choice_id;
  if (optionOrChoice) {
    const selectedOption = { id: optionOrChoice };
    if (interaction.hasOwnProperty("is_correct")) {
      selectedOption.is_correct = interaction.is_correct;
    }
    widget.selectedOption = selectedOption;
  }
  if (interaction.magnitude)
    widget.average_magnitude = interaction.magnitude;
};

function registerCustomTimeline(widgetsContainer) {

  // Checks the widget vote. If a vote exists, sets the results phase.
  // If no vote exists yet, it runs the passed notVotedBehavior.
  const setWidgetPhase = (widget) => {
    getWidgetVote(widget).then(interactions => {
      if (interactions[widget.kind] && interactions[widget.kind].length > 0) {
        const widgetInteraction = interactions[widget.kind][0];
        setWidgetInteraction(widgetInteraction, widget);
        widget.results()
      } else {
        if (widget.timeout) {
          var date = new Date(widget.widgetPayload.published_at).getTime() / 1000;
          var curr = new Date().getTime() / 1000;
          date = date + getDuration(widget.widgetPayload.timeout)
          var isValid = curr > date ? false : true
          const diff = date - curr;

          if (isValid)//&& timeout expired
          {
            widget.interactive({ timeout: diff * 1000 }).then(widget.results);
          }
          else {
            widget.results()
          }
        }

      }
    })
  }


  // Gets initial list of widgets
  LiveLike.getPostedWidgets({
    programId: programId
  }).then(({ widgets }) => {
    // Loops over them, if they're part of liveLikeWidgets list, show them.
    // The `mode` function sets the behavior of each of these widgets

    widgets.forEach(
      widgetPayload =>
        widgetsContainer.showWidget({
          widgetPayload,
          mode: ({ widget }) => {
            return widgetsContainer.attach(widget, 'append').then(() => {
              setWidgetPhase(widget)
            })
          },
          initialLoad: true
        })
    )
  })

  // Defines the behavior for all widgets that are displayed from being published while use is on page.
  // It will be interactive until the timer elapses, and then it will move the the results phase.
  LiveLike.registerWidgetMode(
    'customTimeline',
    ({ widget }) => {
      widgetsContainer
        .attach(widget)
        .then(() => {
          setWidgetPhase(widget)
        })
    }
  )
}


function getWidgetVote(e) {
  return LiveLike.getWidgetInteractions({
    programId: e.program_id,
    widgets: [{ kind: e.kind, id: e.widgetId }],
  })
}

const init = (clientId, programId, leaderboardId) => {
    LiveLike.init({
        clientId: clientId,
      }).then(() => {
        setupTheme();
        showProfileTabIfFirstTimeVisiting();
        setupLeaderboard(leaderboardId);
        refreshProfileData();
        const widgetsContainer = document.querySelector('livelike-widgets');
        widgetsContainer.programid = programId;
        registerCustomTimeline(widgetsContainer)
        document.querySelector('#user-profile-nickname').innerHTML =
          LiveLike.userProfile.nickname;
      });
};