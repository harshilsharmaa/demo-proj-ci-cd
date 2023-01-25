const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission : 'Keleper Explosion X',
    rocket : 'Explorer IS1',
    launchDate : new Date('December 27, 2030'),
    target : 'Kepler-442 b',
    customer: ['HARSHIL', 'ZTM', 'NASA'],
    upcoming : true,
    success: true
}

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId)
}

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming: true,
        customers: ['HARSHIL', 'ZTM', 'NASA'],
        success: true,
    }));
}

module.exports = {
    launches,
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId
}