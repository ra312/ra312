### Hello 👋
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

Hi,I'm Rauan, a Data Scientist who is passionate about making the world a better place with technology and science.

- 🔭 I’m currently working on revenue and churn prediction.
- I am working on Kubernetes auto deployment (ambari and ansible).
- I am looking to collaborate on MLOps software solutions (Feast, Data Ingestion Tools, ML Model registry)
- I am currently learning about cloud-native systems and infrastructure
- Ask me about quantum geometric manifolds and its applications
- Pronous: he/him 

### Languages

[![Python](https://img.shields.io/badge/-Python-000?&logo=python)](https://github.com/adamalston?tab=repositories&q=&type=&language=python)
[![C](https://img.shields.io/badge/-C-000?&logo=C)](https://github.com/adamalston?tab=repositories&q=&type=&language=c)
![TypeScript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript&logoColor=007ACC)
![C++](https://img.shields.io/badge/-C++-000?&logo=c%2b%2b&logoColor=00599C)
![SQL](https://img.shields.io/badge/-SQL-000?&logo=MySQL&logoColor=4479A1)

### Technologies

![CI/CD](https://img.shields.io/badge/-CI%2FCD-000?&logo=CircleCI&logoColor=888)
![Docker](https://img.shields.io/badge/-Docker-000?&logo=Docker)
![Jira](https://img.shields.io/badge/-Jira-000?&logo=Jira-Software&logoColor=0052CC)
![Kubernetes](https://img.shields.io/badge/-Kubernetes-000?&logo=Kubernetes)
![Linux](https://img.shields.io/badge/-Linux-000?&logo=Linux&logoColor=FCC624)



<h3>
    
```python
​
import json
from dataclasses import asdict, dataclass


@dataclass
class MLStack:
    databases        : tuple = ("PostgreSQL", "Oracle", "IBM_DB")
    machine_learning : tuple = ("TensorFlow", "Scikit-Learn", "Prophet", "xgboost", "HyperOpt") 
    misc             : tuple = ("CentOS(RHEL)", "shell", "git", "Jira")
    ongoing          : tuple = ("ZooKeeper", "Apache Knox", "Alpine Linux")

    def serialize(self):
        return json.dumps(asdict(self), indent=4)


stack = Stack()
print(stack.serialize())
​
```
</h3>

## Quick overview
* GitHub stats:  
<a href="https://github.com/anuraghazra/github-readme-stats">
  <!-- Change the `github-readme-stats.anuraghazra1.vercel.app` to `github-readme-stats.vercel.app`  -->
  <img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=ra312&langs_count=8" />
</a>
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.anuraghazra1.vercel.app/api?username=ra312&show_icons=true&line_height=27&include_all_commits=true" alt="My github stats" />
</a>  

<!--
https://github.com/ra312/ra312.git
Hi,I'm Rauan, a Data Scientist working on revenue and churn prediction.

Currently, I am building the analytical platform to empower my peer data scientists to build, design and implement data analytics and machine learning products built primarily on a kubernetes cluster. 
I regularly share my expertise with my team mates by organizing practical workshops on the Big Data infrastructure (the Apache Stack, Kubernetes, Gitlab CI/CD)
I use TensorFlow, Scikit-Learn, HyperOpt, Kubeflow to deliver models and data for high impact business problems.
My team uses a Kubernetes cluster to deploy and orchestrate end-to-end machine learning pipelines.
We are also improving the existing data ingestion tools. Occasionally, we can build a new cluster using ansible and monitor via ambari. 
We love our ML code to be written in Python.


DevOps= Gitlab Runner Pods in Kubernetes
JFrog Container Registry = to store Docker images and ML artefacts
data ingestion = scheduled kubeflow jobs or NiFi/Flink 
ML = TensorFLow, PyTorch, Scikit-Learn, HyperOpt, XgBoost
cluster_infrastructure = ansible, ambari

**ra312/ra312** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:


- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
