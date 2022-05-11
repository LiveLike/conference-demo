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
        document.querySelector('#user-profile-nickname').innerHTML =
          LiveLike.userProfile.nickname;
      });
};