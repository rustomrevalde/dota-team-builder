class DotaTeamBuilder {
    name;
    role;
    winrate;
    players = [
        {
            id: 1,
            name: 'Notail',
            role: 'Full-support',
            winrate: 67
        },
        {
            id: 2,
            name: 'Abed',
            role: 'Mid',
            winrate: 71
        },
        {
            id: 3,
            name: 'Miracle',
            role: 'Carry',
            winrate: 75
        },
        {
            id: 4,
            name: 'Ceb',
            role: 'Semi-support',
            winrate: 68
        },
        {
            id: 5,
            name: 'Collapse',
            role: 'Offlane',
            winrate: 69
        },
        {
            id: 6,
            name: 'Yatoro',
            role: 'Carry',
            winrate: 74
        },
        {
            id: 7,
            name: 'No One',
            role: 'Mid',
            winrate: 73
        },
        {
            id: 8,
            name: 'Topson',
            role: 'Mid',
            winrate: 74
        }

    ];
    selectedPlayers = [];

    addPlayer(name, role, playerWinrate) {
        const playerId = this.players.length + 1;
        const playersProfile = {
            id: playerId,
            name: name,
            role: role,
            winrate: playerWinrate
        }

        this.players.push(playersProfile);
        this.renderUI();
    }

    addTeamMember(id) {
        const selectedPlayerToAdd = this.players.map((player) => player.id).indexOf(id);
        const playerToAdd = this.players[selectedPlayerToAdd];

        if (this.selectedPlayers.length > 4) {
            return;
        }

        const duplicatePlayerArr = this.selectedPlayers.filter(player => {
            return player.id === playerToAdd.id || player.role === playerToAdd.role;
        });

        if (duplicatePlayerArr.length > 0) {
            return;
        }

        this.selectedPlayers.push(playerToAdd);
        this.renderSelectedPlayersToUI();
    }

    removedPlayer(id) {
        const selectedPlayerToRemove = this.selectedPlayers.map((player) => player.id).indexOf(id);
        const playerToRemove = this.selectedPlayers[selectedPlayerToRemove];
        this.selectedPlayers.splice(selectedPlayerToRemove, 1);

        this.renderUI();
        this.renderSelectedPlayersToUI();
    }

    renderUI() {
        let HTMLstring = '';
        this.players.forEach((player) => {
            HTMLstring = HTMLstring + `<li>${player.id} - ${player.name} - ${player.role} - ${player.winrate}
                <button onclick="addTeamMember(${player.id})">+</li>`;
        });
        document.querySelector('#players').innerHTML = HTMLstring;
    }

    renderSelectedPlayersToUI() {
        let HTMLstring = '';
        let totalWinrate = 0;
        this.selectedPlayers.forEach((player) => {
            HTMLstring = HTMLstring + `<li>${player.id} - ${player.name} - ${player.role} - ${player.winrate}
                <button onclick="playerRemoved(${player.id})">x</li>`;
            totalWinrate = totalWinrate + player.winrate;
        });

        let averageWinrate = totalWinrate / this.selectedPlayers.length;

        document.querySelector('#selectedPlayer').innerHTML = HTMLstring;
        document.getElementById('total-winrate').value = averageWinrate > 0 ? Math.round(averageWinrate) + '%' : 0;
    }
}