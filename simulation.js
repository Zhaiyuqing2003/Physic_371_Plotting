export const simulate = () => {
    const MASS = 0.1;
    const GRAVITY = 9.81;
    const K = 8 * 25;
    const CV = 3;

    const V0 = 5;
    const A0 = GRAVITY;
    const T = 10;
    const dt = 0.01;

    const N = Math.round(T / dt);

    const linspace = (start, end, n) => {
        const step = (end - start) / (n - 1);
        return Array.from({ length: n }, (_, i) => start + i * step);
    }

    const zeros = (n) => Array.from({ length: n }, () => 0);

    const f1 = (x, v, t) => v;
    const f2 = (x, v, t) => x > 0 ? -CV / MASS * v - K / MASS * x + GRAVITY : -CV / MASS * v + GRAVITY;

    const t = linspace(0, T, N + 1);
    const x = zeros(N + 1);
    const v = zeros(N + 1);
    const a = zeros(N + 1);

    v[0] = V0;
    a[0] = A0;

    for (let i = 0; i < N; i++) {
        const k11 = f1(x[i], v[i], t[i]);
        const k12 = f2(x[i], v[i], t[i]);
        const k21 = f1(x[i] + k11 * dt / 2, v[i] + k12 * dt / 2, t[i] + dt / 2);
        const k22 = f2(x[i] + k11 * dt / 2, v[i] + k12 * dt / 2, t[i] + dt / 2);
        const k31 = f1(x[i] + k21 * dt / 2, v[i] + k22 * dt / 2, t[i] + dt / 2);
        const k32 = f2(x[i] + k21 * dt / 2, v[i] + k22 * dt / 2, t[i] + dt / 2);

        const k41 = f1(x[i] + k31 * dt, v[i] + k32 * dt, t[i] + dt);
        const k42 = f2(x[i] + k31 * dt, v[i] + k32 * dt, t[i] + dt);

        x[i + 1] = x[i] + (k11 + 2 * k21 + 2 * k31 + k41) * dt / 6;
        v[i + 1] = v[i] + (k12 + 2 * k22 + 2 * k32 + k42) * dt / 6;
        a[i + 1] = k12;
    }

    return [ t, x, v, a ]
}