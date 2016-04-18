import colors from '../colors';

const levels = [
    {
        title: 'Level One: Shape it',
        background: colors.background,
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100],
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
        title: 'Level Two: Watch your tool',
        initialShape: {
            points: [[0, 0], [0, 25], [100, 25], [100, 0]],
            position: [100, 100]
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
            {
                time: 5,
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
        title: 'Level Three: Subtraction is out there',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 5,
                // triangle down
                tool: [[0, 0], [50, 50], [100, 0]],
                center: [50, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 5,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 0], [0, 100], [50, 150], [100, 100], [100, 50], [50, 50], [50, 0]],

    },
    {
        title: 'Level Four: Reuse wisely',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 8,
                // half triangle down right
                tool: [[0, 0], [0, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.highlight,
            },
            {
                time: 5,
                // half triangle down left
                tool: [[0, 0], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 50], [50, 50], [0, 100], [50, 100], [100, 150], [100, 0], [50, 0]],
        //goal: [[0, 50], [0, 100], [50, 100], [100, 150], [100, 75], [50, 75], [100, 25], [100, 0], [50, 0]],

    },
    {
        title: 'Fifth Level: Warming up',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 5,
                // half triangle up right
                tool: [[0, 0], [0, 50], [50, 50]],
                center: [25, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 5,
                // half triangle up left
                tool: [[0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.secondary,
            },
            {
                time: 5,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, -50], [0, 100], [100, 100], [100, -50], [75, -25], [75, 25], [25, 25], [25, -25]],

    }
]

export default levels;
