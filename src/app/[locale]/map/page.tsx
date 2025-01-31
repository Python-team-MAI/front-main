import React from 'react'
import { UniversityMap } from '@/entities/Map/ui/UniversityMap'

const MapPage = async () => {
    // const buildingGraph: IBuildingGraph = {
    //     floors: [
    //         {
    //             floor: 1,
    //             nodes: [
    //                 {
    //                     id: 'entrance_1',
    //                     type: 'entrance',
    //                     x: 100,
    //                     y: 500,
    //                     floor: 1,
    //                     connections: ['corridor_1a'],
    //                 },
    //                 {
    //                     id: 'corridor_1a',
    //                     type: 'corridor',
    //                     x: 200,
    //                     y: 500,
    //                     floor: 1,
    //                     connections: ['elevator_1', 'stairs_1', 'cafe_1', 'entrance_1'],
    //                 },
    //                 {
    //                     id: 'cafe_1',
    //                     type: 'room',
    //                     x: 300,
    //                     y: 500,
    //                     floor: 1,
    //                     connections: ['corridor_1a'],
    //                 },
    //                 {
    //                     id: 'elevator_1',
    //                     type: 'elevator',
    //                     x: 200,
    //                     y: 400,
    //                     floor: 1,
    //                     connections: ['corridor_1a'],
    //                 },
    //                 {
    //                     id: 'stairs_1',
    //                     type: 'stairs',
    //                     x: 200,
    //                     y: 600,
    //                     floor: 1,
    //                     connections: ['corridor_1a'],
    //                 },
    //             ],
    //         },
    //         {
    //             floor: 2,
    //             nodes: [
    //                 {
    //                     id: 'corridor_2a',
    //                     type: 'corridor',
    //                     x: 200,
    //                     y: 500,
    //                     floor: 2,
    //                     connections: ['elevator_2', 'stairs_2', 'toilet_2', 'lab_2'],
    //                 },
    //                 {
    //                     id: 'elevator_2',
    //                     type: 'elevator',
    //                     x: 200,
    //                     y: 400,
    //                     floor: 2,
    //                     connections: ['corridor_2a'],
    //                 },
    //                 {
    //                     id: 'stairs_2',
    //                     type: 'stairs',
    //                     x: 200,
    //                     y: 600,
    //                     floor: 2,
    //                     connections: ['corridor_2a'],
    //                 },
    //                 {
    //                     id: 'toilet_2',
    //                     type: 'room',
    //                     x: 300,
    //                     y: 500,
    //                     floor: 2,
    //                     connections: ['corridor_2a'],
    //                 },
    //                 {
    //                     id: 'lab_2',
    //                     type: 'room',
    //                     x: 100,
    //                     y: 500,
    //                     floor: 2,
    //                     connections: ['corridor_2a'],
    //                 },
    //             ],
    //         },
    //     ],
    //     verticalConnections: [
    //         {
    //             type: 'elevator',
    //             nodes: ['elevator_1', 'elevator_2'],
    //             weight: 50,
    //             name: 'Центральный лифт',
    //         },
    //         {
    //             type: 'stairs',
    //             nodes: ['stairs_1', 'stairs_2'],
    //             weight: 70,
    //             name: 'Супер лестница',
    //         },
    //     ],
    // }
    // try {
    //     const navSystem = new NavigationSystem(buildingGraph)

    //     const path = await navSystem.findPath('corridor_1a', 'corridor_2a')
    //     console.log(path)

    //     const instructions = navSystem.generateInstructions(path)
    //     instructions.forEach((step, index) => console.log(`${index + 1}. ${step}`))
    // } catch (error) {
    //     console.error('Ошибка навигации:', error instanceof Error ? error.message : error)
    // }

    return <UniversityMap />
}

export default MapPage
