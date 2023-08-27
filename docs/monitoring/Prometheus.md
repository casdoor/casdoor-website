---
title: Prometheus
description: Use Prometheus to collect information about running Casdoor.
keywords: [Prometheus]
authors: [OutOfEastGate]
---

To collect Casdoor's runtime metrics, such as API Throughput, API Latency, CPU Usage, Memory Usage, and more, you need to configure your Prometheus profile.

```yml
global:
  scrape_interval: 10s # The time interval for fetching metrics

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'casdoor' # Name of the application to be monitored 
    static_configs:
      - targets: ['localhost:8000'] # Back-end address of Casdoor deployment
    metrics_path: '/api/metrics' # Path for collecting indicators
```

After successful configuration, you will find the following information in Prometheus:

![info](/img/monitoring/prometheus/info.png)
