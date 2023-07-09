---
title: Prometheus
description: Use prometheus to collect information about running casdoor
keywords: [prometheus]
authors: [OutOfEastGate]
---
Use Prometheus to collect casdoor's runtime metrics, including API Throughput, API Latency, CPU Usage, Memory Usage, and so on, as you should configure your Prometheus profile

```yml
global:
  scrape_interval: 10s #The time interval for fetching metrics

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'casdoor' #Name of the application to be monitored 
    static_configs:
      - targets: ['localhost:8000'] #Back-end address of casdoor deployment
    metrics_path: '/api/metrics' #Path for collecting indicators
```

After the configuration is successful, you will find the following information in Prometheus

![info](/img/monitoring/prometheus/info.png)
