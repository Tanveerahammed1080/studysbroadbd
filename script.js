document.addEventListener('DOMContentLoaded', function () {
    const universityData = [
        { "name": "University of Toronto", "province": "Ontario", "type": "Public", "gpa": "4.8+", "url": "www.utoronto.ca" },
        { "name": "University of British Columbia (UBC)", "province": "British Columbia", "type": "Public", "gpa": "4.8+", "url": "www.ubc.ca" },
        { "name": "McGill University", "province": "Quebec", "type": "Public", "gpa": "4.7+", "url": "www.mcgill.ca" },
        { "name": "University of Alberta", "province": "Alberta", "type": "Public", "gpa": "4.5+", "url": "www.ualberta.ca" },
        { "name": "McMaster University", "province": "Ontario", "type": "Public", "gpa": "4.6+", "url": "www.mcmaster.ca" },
        { "name": "Simon Fraser University", "province": "British Columbia", "type": "Public", "gpa": "4.2+", "url": "www.sfu.ca" },
        { "name": "University of Waterloo", "province": "Ontario", "type": "Public", "gpa": "4.7+", "url": "www.uwaterloo.ca" },
        { "name": "Dalhousie University", "province": "Nova Scotia", "type": "Public", "gpa": "4.0+", "url": "www.dal.ca" },
        { "name": "University of Calgary", "province": "Alberta", "type": "Public", "gpa": "4.3+", "url": "www.ucalgary.ca" },
        { "name": "York University", "province": "Ontario", "type": "Public", "gpa": "3.8+", "url": "www.yorku.ca" },
        { "name": "University of Manitoba", "province": "Manitoba", "type": "Public", "gpa": "3.5+", "url": "www.umanitoba.ca" },
        { "name": "University of Saskatchewan", "province": "Saskatchewan", "type": "Public", "gpa": "3.5+", "url": "www.usask.ca" },
        { "name": "Concordia University", "province": "Quebec", "type": "Public", "gpa": "3.7+", "url": "www.concordia.ca" },
        { "name": "Carleton University", "province": "Ontario", "type": "Public", "gpa": "4.0+", "url": "www.carleton.ca" },
        { "name": "Queen's University", "province": "Ontario", "type": "Public", "gpa": "4.5+", "url": "www.queensu.ca" },
        { "name": "Western University", "province": "Ontario", "type": "Public", "gpa": "4.4+", "url": "www.westernu.ca" },
        { "name": "University of Ottawa", "province": "Ontario", "type": "Public", "gpa": "4.2+", "url": "www.uottawa.ca" },
        { "name": "Lakehead University", "province": "Ontario", "type": "Public", "gpa": "3.5+", "url": "www.lakeheadu.ca" },
        { "name": "Trent University", "province": "Ontario", "type": "Public", "gpa": "3.7+", "url": "www.trentu.ca" },
        { "name": "Wilfrid Laurier University", "province": "Ontario", "type": "Public", "gpa": "4.0+", "url": "www.wlu.ca" },
        { "name": "University of Guelph", "province": "Ontario", "type": "Public", "gpa": "4.0+", "url": "www.uoguelph.ca" },
        { "name": "University of Windsor", "province": "Ontario", "type": "Public", "gpa": "3.8+", "url": "www.uwindsor.ca" },
        { "name": "University of Regina", "province": "Saskatchewan", "type": "Public", "gpa": "3.5+", "url": "www.uregina.ca" },
        { "name": "Trinity Western University", "province": "British Columbia", "type": "Private", "gpa": "3.5+", "url": "www.twu.ca" },
        { "name": "Yorkville University", "province": "Ontario", "type": "Private", "gpa": "3.0+", "url": "www.yorkvilleu.ca" }
    ];
    const ieltsData = [
        { "name": "U of Toronto", "score": 6.5, "bands": "6.0 each" },
        { "name": "UBC", "score": 7.0, "bands": "Often 6.5 each" },
        { "name": "McGill", "score": 6.5, "bands": "Often 6.0 each" },
        { "name": "McMaster", "score": 6.5, "bands": "5.0 each" },
        { "name": "U of Alberta", "score": 6.5, "bands": "5.0 L/R/W, 7.5 S" },
        { "name": "Waterloo", "score": 6.5, "bands": "Often 6.0 each" },
        { "name": "York U", "score": 6.0, "bands": "Often 5.5 each" },
        { "name": "Dalhousie", "score": 6.5, "bands": "Often 6.0 each" }
    ];
    const fundsDataUpdated = {
        "beforeSep2025": [20635, 25690, 31583, 38346, 43492, 49051, 54611],
        "afterSep2025": [22895, 28502, 35040, 42543, 48252, 54420, 60589],
        "additionalBefore": 5559,
        "additionalAfter": 6170
    };

    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');

    function switchTab(tabName) {
        navTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('tab-active');
                tab.classList.remove('tab-inactive');
            } else {
                tab.classList.remove('tab-active');
                tab.classList.add('tab-inactive');
            }
        });
        contentSections.forEach(section => {
            if (section.id === tabName) {
                section.classList.add('content-active');
            } else {
                section.classList.remove('content-active');
            }
        });
    }

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    switchTab('overview');

    const uniTableBody = document.getElementById('uniTableBody');
    const provinceFilter = document.getElementById('provinceFilter');
    const typeFilter = document.getElementById('typeFilter');
    const uniSearch = document.getElementById('uniSearch');
    const noResults = document.getElementById('noResults');
    
    const provinces = [...new Set(universityData.map(uni => uni.province))].sort();
    provinces.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        provinceFilter.appendChild(option);
    });

    function renderTable() {
        const province = provinceFilter.value;
        const type = typeFilter.value;
        const search = uniSearch.value.toLowerCase();
        uniTableBody.innerHTML = '';
        
        const filteredData = universityData.filter(uni => {
            return (province === '' || uni.province === province) &&
                   (type === '' || uni.type === type) &&
                   (uni.name.toLowerCase().includes(search));
        });
        
        if (filteredData.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }

        filteredData.forEach(uni => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-red-50';
            row.innerHTML = `
                <td class="p-3">${uni.name}</td>
                <td class="p-3">${uni.province}</td>
                <td class="p-3"><span class="px-2 py-1 text-xs font-semibold rounded-full ${uni.type === 'Public' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${uni.type === 'Public' ? 'সরকারি' : 'বেসরকারি'}</span></td>
                <td class="p-3 font-medium text-gray-700">${uni.gpa} / 5.0</td>
                <td class="p-3"><a href="https://${uni.url}" target="_blank" class="text-red-600 hover:text-red-800 hover:underline">${uni.url}</a></td>
            `;
            uniTableBody.appendChild(row);
        });
    }
    provinceFilter.addEventListener('change', renderTable);
    typeFilter.addEventListener('change', renderTable);
    uniSearch.addEventListener('input', renderTable);
    renderTable();

    const ieltsCtx = document.getElementById('ieltsChart').getContext('2d');
    const ieltsChart = new Chart(ieltsCtx, {
        type: 'bar',
        data: {
            labels: ieltsData.map(d => d.name),
            datasets: [{
                label: 'Overall IELTS Score',
                data: ieltsData.map(d => d.score),
                backgroundColor: 'rgba(220, 38, 38, 0.7)', // Red color
                borderColor: 'rgba(220, 38, 38, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, min: 5, max: 7.5, title: { display: true, text: 'সর্বনিম্ন সামগ্রিক স্কোর' } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) { return `Overall: ${context.parsed.x}`; },
                        afterLabel: function(context) { return `সর্বনিম্ন ব্যান্ড: ${ieltsData[context.dataIndex].bands}`; }
                    }
                }
            }
        }
    });

    const familyMembersInput = document.getElementById('familyMembers');
    const fundsResultDiv = document.getElementById('fundsResult');

    function calculateFunds() {
        const num = parseInt(familyMembersInput.value, 10);
        if (isNaN(num) || num < 1 || num > 10) {
            fundsResultDiv.innerHTML = '<p class="text-red-600">Please enter a number between 1 and 10.</p>';
            return;
        }

        const getAmount = (base, additional, count) => {
            if (count <= 7) {
                return base[count - 1];
            }
            return base[6] + (count - 7) * additional;
        };

        const amountBefore = getAmount(fundsDataUpdated.beforeSep2025, fundsDataUpdated.additionalBefore, num);
        const amountAfter = getAmount(fundsDataUpdated.afterSep2025, fundsDataUpdated.additionalAfter, num);

        fundsResultDiv.innerHTML = `
            <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <p class="font-medium text-slate-700">১ সেপ্টেম্বর, ২০২৫ এর আগে:</p>
                <p class="text-xl font-bold text-red-700">CAN$ ${amountBefore.toLocaleString()}</p>
            </div>
            <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <p class="font-medium text-slate-700">১ সেপ্টেম্বর, ২০২৫ থেকে:</p>
                <p class="text-xl font-bold text-red-700">CAN$ ${amountAfter.toLocaleString()}</p>
            </div>
        `;
    }
    familyMembersInput.addEventListener('input', calculateFunds);
    calculateFunds();
});