const updateUserProfile = ({ nickname, email, firstName, lastName }) => {
    email = "xhevat@livelike.com";
    nickname = "xhevo";
    LiveLike.updateUserProfile({
        accessToken: LiveLike.userProfile.access_token,
        options: {
            nickname: nickname,
            custom_data: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName
            })
        }
    }).then(res => {
        refreshProfileData();
    }).catch(err => {
        console.warn(err);
    });
};

const refreshProfileData = () => {
    document.querySelector("#tab-link-profile-label").innerHTML = `Profile(${LiveLike.userProfile.nickname})`;
    document.querySelector("#form-user-nickname").value = LiveLike.userProfile.nickname;
    var customData = JSON.parse(LiveLike.userProfile.custom_data);
    if (customData) {
        document.querySelector("#form-user-email").value = customData.email;
        document.querySelector("#form-user-firstname").value = customData.firstName;
        document.querySelector("#form-user-lastname").value = customData.lastName;
    }
}

const handleUpdateUserProfile = (e) => {
    updateUserProfile({
        nickname: document.querySelector("#form-user-nickname").value,
        email: document.querySelector("#form-user-email").value,
        firstName: document.querySelector("#form-user-firstname").value,
        lastName: document.querySelector("#form-user-lastname").value,
    });
};

const setupLeaderboard = (program) => {
    const buildProfileRank = (leaderboardId) =>
        LiveLike.getLeaderboardProfileRank({
            leaderboardId,
            profileId: LiveLike.userProfile.id,
        })
            .then((profileRank) => {
                // If rank and points element already exist, update their values
                const rankEl = document.querySelector(".profile-list-item > .rank");
                const ptsEl = document.querySelector(".profile-list-item > .pts");
                if (ptsEl && rankEl) {
                    ptsEl.innerHTML = `${profileRank.score} pts`;
                    rankEl.innerHTML = `#${profileRank.rank}`;
                } else {
                    // If rank and points don't already exist, create the elements and attach them
                    const stats = document.querySelector(".profile-stats");
                    const rankItem = document.createElement("li");
                    rankItem.setAttribute("class", "profile-list-item");
                    rankItem.innerHTML = `
              <div class="rank">#${profileRank.rank}</div>
              <div class="pts">${profileRank.score} pts</div>
            `;
                    stats.appendChild(rankItem);
                }
            })
            .catch(() => console.log("Current user not a part of leaderboard yet."));

    const buildLeaderboard = (leaderboardId) => {
        LiveLike.getLeaderboardEntries({
            leaderboardId,
        }).then((lb) => {
            const lbContainer = document.querySelector(".leaderboard-entries-container");

            // If leaderboard items already exist, remove them to re-build on leaderboard update
            lbContainer.children.length > 0 &&
                Array.from(lbContainer.children).forEach((el) => el.remove());

            // Loop through leaderboard entries to create list items for each entry
            lb.entries.forEach((entry) => {
                const entryRow = document.createElement("tr");
                entryRow.setAttribute("class", "list-item");
                entryRow.innerHTML = `
            <td class="rank">${entry.rank}</td>
            <td class="name">${entry.profile_nickname}</td>
            <td class="pts">${entry.score}</td>
          `;
                lbContainer.appendChild(entryRow);
            });
        });
    };

    const leaderboardId =
        program.leaderboards &&
        program.leaderboards.length > 3 &&
        program.leaderboards[3].id;

    if (leaderboardId) {
        buildLeaderboard(leaderboardId);
        buildProfileRank(leaderboardId);
        // When a widget is dismissed, we update the leaderboard to show updated ranks and points
        document.addEventListener("beforewidgetdetached", () => {
            buildLeaderboard(leaderboardId);
            buildProfileRank(leaderboardId);
        });
    }
};

const showNicknameOverlay = () => {
    document.getElementById("modal").style.display = "block";
};

const hideNicknameOverlay = () => {
    document.getElementById("modal").style.display = "none";
};

const isLoggedIn = () => {
    var value = localStorage.getItem("isLoggedIn");
    if (value) {
        return true;
    } else {
        return false;
    }
};

const setupNickname = () => {
    if (!isLoggedIn()) {
        showNicknameOverlay();
    }
}

const submitNickname = () => {
    //sumbitNickname().then();
    hideNicknameOverlay();
    localStorage.setItem("isLoggedIn", true);
}

const init = (clientId, programId) => {
    fetch("https://cf-blast.livelikecdn.com/api/v1/programs/" + programId + "/")
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
        setupNickname();
        setupLeaderboard(program);
        refreshProfileData();
    });
}
