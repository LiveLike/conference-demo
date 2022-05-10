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

const setupLeaderboard = (program) => {
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

  const leaderboardId = '9af81022-8a85-4511-bb7d-2b74934efb93';

  const updateLeaderboardData = () => {
    buildLeaderboard(leaderboardId);
    buildProfileRank(leaderboardId);
  };
  if (leaderboardId) {
    // When a widget is dismissed, we update the leaderboard to show updated ranks and points
    document.addEventListener('vote', updateLeaderboardData);
    document.addEventListener('answer', updateLeaderboardData);
    document.addEventListener('prediction', updateLeaderboardData);
    document.addEventListener('cheer', updateLeaderboardData);
    document.addEventListener('slider', updateLeaderboardData);
    document.addEventListener('rankchange', updateLeaderboardData);
    document.addEventListener('beforewidgetdetached', updateLeaderboardData);
  }
};

const showProfileTab = () => {
  document.querySelector('#widget-nav-tab').style.display = 'none';
  document.querySelector('#leaderboard-nav-tab').style.display = 'none';

  document.getElementById('profile-tab-label').click();
};

const profileIsValid = () => {
  var value = localStorage.getItem('ProfileIsValid');
  if (value) {
    return true;
  }

  var fullName = document.querySelector('#form-user-fullName').value;
  var nickname = document.querySelector('#form-user-nickName').value;
  var email = document.querySelector('#form-user-email').value;

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
    document.getElementById('profile-tab-label').style.display = 'none';
  }
};

const getMilliseconds = (duration) => {
  const regex =
    /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
  const m = duration.match(regex);
  const s = m[8] && m[8] * 1000;
  const mm = m[7] && m[7] * 60000;
  const h = m[6] && m[6] * 3600000;
  const d = m[5] && m[5] * 86400000;
  return s + mm + h + d;
};

const addTimerToWidgets = () => {
  const widgetsContainer = document.querySelector('livelike-widgets');
  let send15sTimer = ({ widget }) => getMilliseconds(widget.timeout);
  widgetsContainer && (widgetsContainer.overRideTimer = send15sTimer);
  widgetsContainer.programid = '2708f001-383d-418a-912a-391b466e3d89';
};

const init = (clientId, programId) => {
  fetch('https://cf-blast.livelikecdn.com/api/v1/programs/' + programId + '/')
    .then((p) => p.json())
    .then((program) => {
      return initLiveLike(clientId, program);
    });
};

const initLiveLike = (clientId, program) => {
  LiveLike.init({
    clientId: clientId,
  }).then((profile) => {
    setupTheme();
    showProfileTabIfFirstTimeVisiting();
    addTimerToWidgets();
    setupLeaderboard(program);
    refreshProfileData();
    document.querySelector('#user-profile-nickname').innerHTML =
      LiveLike.userProfile.nickname;
  });
};
