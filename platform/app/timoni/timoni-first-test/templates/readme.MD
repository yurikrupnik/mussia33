```shell
timoni mod push . oci://yurikrupnik/timoni-first-test --version "0.0.2"
timoni build cluster .
timoni mod vet
timoni mod pull  oci://docker.io/yurikrupnik/timoni-first-test:0.0.2
```
