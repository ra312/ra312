### Hello 👋
[![Visits Badge](https://badges.pufler.dev/visits/ra312/ra312)](https://badges.pufler.dev/visits/ra312/ra312)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

Hi,I'm Rauan, a Software Engineer who enjoys translating business problems to software products.

- 🔭 I usually work on automating and orchestrating custom pipelines for data extraction, ML model deployment and tracking in production (Google Kubernetes Engine, Vertex AI)

#### 👨🏻‍💻 Languages and Tools <br />
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png"></code>
![Kubernetes](https://img.shields.io/badge/-Kubernetes-000?&logo=Kubernetes)
[![C](https://img.shields.io/badge/-C-000?&logo=C)](https://github.com/adamalston?tab=repositories&q=&type=&language=c)
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/tensorflow/tensorflow.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/scikit-learn/scikit-learn.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/bash/bash.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/linux/linux.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/jupyter-notebook/jupyter-notebook.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png"></code>
![SQL](https://img.shields.io/badge/-SQL-000?&logo=MySQL&logoColor=4479A1)
![CI/CD](https://img.shields.io/badge/-CI%2FCD-000?&logo=CircleCI&logoColor=888)
![Jira](https://img.shields.io/badge/-Jira-000?&logo=Jira-Software&logoColor=0052CC)
![C++](https://img.shields.io/badge/-C++-000?&logo=c%2b%2b&logoColor=00599C)
<h3>
    
```python
​
import json
from dataclasses import asdict, dataclass


@dataclass
class MLStack:
    external_databases : tuple = ("PostgreSQL", "Oracle", "IBM_DB")
    machine_learning   : tuple = ("TensorFlow", "Scikit-Learn", "PyTorch", "xgBoost", "HyperOpt") 
    apache_stack       : tuple = ("Apache Spark", "Hive", "NiFi", "Flink", "Apache Knox")
    cloud_stack        : tuple = ("Google Kubernetes Engine")
    production         : tuple = ("Vertex AI", "Kubeflow","Luigi", "Airflow")
    os                 : tuple = ("ZooKeeper", "Alpine Linux")

    def serialize(self):
        return json.dumps(asdict(self), indent=4)


stack = Stack()
print(stack.serialize())
​
```
</h3>
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
