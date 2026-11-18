# hello-zv2-demo

Throwaway Node.js container for demonstrating Kubernetes health probes and replica identity. Its demo-only `/crash` and `/hang` routes are intentionally disruptive; do not reuse this app in production or copy those routes into techat.

Build and run locally:

```sh
docker build -t hello-zv2-demo .
docker run --rm -p 3000:3000 -e DEMO_SECRET=demo-only hello-zv2-demo
```

Open `http://localhost:3000/` for pod/uptime metadata and a boolean `secretSet` indicator. `/health` returns `ok`; `/crash` exits the process after 100 ms; `/hang` leaves its request pending. The app never returns the secret value.
