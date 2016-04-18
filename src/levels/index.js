import colors from '../colors';

const levels = [
    {
        title: 'Level One: Shape It',
        background: colors.background,
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
            color: colors.primary
        },
        phases: [
            {
                time: 5,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.highlight,
            },
        ],
        goal: [[0, -50], [0, 100], [100, 100], [100, 0], [50, 0], [50, -50]],

    },
    {
        title: 'Level Two: Tool Shift',
        initialShape: {
            points: [[0, 0], [0, 25], [100, 25], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // triangle up
                tool: [[50, 0], [0, 50], [100, 50]],
                center: [50, 25],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[50, -50], [0, 0], [0, 25], [25, 25], [25, 75], [75, 75], [75, 25], [100, 25], [100, 0]],

    },
    {
        title: 'Level Three: Sign Matters',
        initialShape: {
            points: [[0, -50], [0, 50], [100, 50], [100, -50]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // triangle down
                tool: [[0, 0], [50, 50], [100, 0]],
                center: [50, 25],
                signCenter: [50, 22],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                signCenter: [25, 22],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, -50], [0, 50], [50, 100], [100, 50], [100, 0], [50, 0], [50, -50]],

    },
    {
        title: 'Level Four: Reuse Wisely',
        initialShape: {
            points: [[0, -50], [0, 50], [100, 50], [100, -50]],
            position: [350, 325],
        },
        phases: [
            {
                time: 6,
                // half triangle down right
                tool: [[0, 0], [0, 50], [50, 0]],
                center: [25, 25],
                signCenter: [18, 12],
                type: 'subtract',
                color: colors.highlight,
            },
            {
                time: 4,
                // half triangle down left
                tool: [[0, 0], [50, 50], [50, 0]],
                center: [25, 25],
                signCenter: [34, 12],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 0], [50, 0], [0, 50], [50, 50], [100, 100], [100, -50], [50, -50]],
        //goal: [[0, 50], [0, 100], [50, 100], [100, 150], [100, 75], [50, 75], [100, 25], [100, 0], [50, 0]],

    },
    {
        title: 'Level Five: Warming Up',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // half triangle up right
                tool: [[0, 0], [0, 50], [50, 50]],
                center: [25, 25],
                signCenter: [16, 30],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // half triangle up left
                tool: [[0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                signCenter: [34, 30],
                type: 'add',
                color: colors.secondary,
            },
            {
                time: 4,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, -50], [0, 100], [100, 100], [100, -50], [75, -25], [75, 25], [25, 25], [25, -25]],

    },
    {
        title: 'Level Six: Unuseful Things',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // triangle down-left
                tool: [[0, 0], [0, 75], [75, 75]],
                center: [25, 25],
                signCenter: [20, 50],
                type: 'add',
                color: colors.secondary,
            },
            {
                time: 4,
                // triangle down-left small
                tool: [[0, 0], [0, 50], [50, 50]],
                center: [25, 25],
                signCenter: [14, 25],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[-25, -25], [-25, 25], [0, 25], [0, 100], [100, 100], [100, 25], [125, 25], [75, -25], [75, 0], [25, 0], [25, -25]],
    },
    {
        title: 'Level Seven: Precision',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // triangle left
                tool: [[50, 0], [0, 50], [50, 100]],
                center: [25, 25],
                signCenter: [10, 45],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // half triangle right
                tool: [[0, 0], [0, 100], [50, 50]],
                center: [25, 25],
                signCenter: [20, 50],
                type: 'add',
                color: colors.secondary,
            },
            {
                time: 4,
                // weird form
                tool: [[-75, 0], [-75, 25], [-25, 25], [-25, 75], [0, 75], [0, 25], [75, 25], [75, 0]],
                center: [50, 25],
                signCenter: [15, 15],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[-25, -25], [-50, 0], [0, 50], [0, 100], [100, 100], [100, 50], [150, 0], [125, -25], [100, -25], [100, 0], [50, 0], [50, 25], [25, 25], [25, 0], [0, 0], [0, -25]],

    },
    {
        title: 'Level Eight: Getting Messy',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // corner up-right
                tool: [[0, 0], [0, 25], [25, 25], [25, 50], [50, 50], [50, 0]],
                center: [25, 25],
                signCenter: [32, 12],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // corner down-right
                tool: [[0, 0], [0, 25], [50, 25], [50, -25], [25, -25], [25, 0]],
                center: [25, 25],
                signCenter: [32, 10],
                type: 'add',
                color: colors.tertiary,
            },
            {
                time: 4,
                // big corner up-left
                tool: [[0, 0], [0, 75], [25, 75], [25, 25], [75, 25], [75, 0]],
                center: [50, 50],
                signCenter: [13, 13],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 0], [-25, 0], [-25, 25], [0, 25], [0, 75], [-25, 75], [-25, 125], [25, 125], [25, 100], [50, 100], [50, 125], [75, 125], [75, 100], [100, 100], [100, 75], [125, 75], [125, 50], [100, 50], [100, 25], [125, 25], [125, -25], [75, -25], [75, 0], [25, 0], [25, -25], [0, -25]],
    },
    {
        title: 'Level Nine: Fast Thinker',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 2,
                // big triangle down-right
                tool: [[0, 100], [100, 100], [100, 0]],
                center: [50, 50],
                signCenter: [70, 60],
                type: 'subtract',
                color: colors.highlight,
            },
            {
                time: 2,
                // triangle up
                tool: [[0, 50], [100, 50], [50, 0]],
                center: [50, 25],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 0], [0, 100], [50, 100], [100, 50], [100, 0], [75, 0], [50, -25], [25, 0]],
    },
    {
        title: 'Level Ten: Shapeshift Master',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [350, 325],
        },
        phases: [
            {
                time: 4,
                // big square
                tool: [[0, 0], [0, 100], [100, 100], [100, 0]],
                center: [50, 50],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // half triangle down left
                tool: [[0, 0], [50, 50], [50, 0]],
                center: [25, 25],
                signCenter: [34, 12],
                type: 'subtract',
                color: colors.tertiary,
            },
            {
                time: 4,
                // corner up-right
                tool: [[0, 0], [0, 25], [25, 25], [25, 50], [50, 50], [50, 0]],
                center: [25, 25],
                signCenter: [32, 12],
                type: 'subtract',
                color: colors.secondary,
            },
            {
                time: 4,
                // L corner down-left
                tool: [[-25, 0], [-25, 75], [25, 75], [25, 50], [0, 50], [0, 0]],
                center: [50, 50],
                signCenter: [0, 55],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 4,
                // half triangle down right
                tool: [[0, 0], [0, 50], [50, 0]],
                center: [25, 25],
                signCenter: [12, 12],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[-50, 0], [-50, 50], [-25, 50], [-25, 25], [25, 25], [25, 75], [0, 75], [0, 150], [50, 150], [50, 125], [25, 125], [25, 100], [100, 100], [100, 50], [0, -50]],
    }
]

export default levels;
