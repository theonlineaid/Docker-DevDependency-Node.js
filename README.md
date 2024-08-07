
## Docker setup

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
docker exec -it  container bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
docker build . -t onlineaid/k8s-web [create image]
docker push onlineaid/k8s-web [push docker hub]
docker pull onlineaid/k8s-web


docker network ls
docker network rm docker-nodejs_default -f

```

## MongoDB setup

```
mongosh -u "onlineaid" -p "password"
docker run -it --rm --network web-hello_default mongo mongosh --host mongo -u "onlineaid" -p "password" --authenticationDatabase "admin"    

----------------------------
#   volumes:
#     - ./db_data/:/data/db/
----------------------------
- Delete db_data folder 
sudo chown -R $(whoami):$(whoami) /home/bdtask24-8/Documents/k8s/web-hello/mongodb
chmod -R 755 /home/bdtask24-8/Documents/k8s/web-hello/mongodb

```

## Minikube setup
```
sudo dpkg -i virtualbox-7.0_7.0.20-163906~Ubuntu~jammy_amd64.deb
minikube start --driver=virtualbox
sudo apt-get install virtualbox
minikube delete
sudo apt install -f
sudo apt-get install --reinstall virtualbox

hostnamectl
minikube status
minikube start --drive=virtualbox / docker / vmware
minikube status

minikube ssh
docker ps

ctrl + d

kubectl get pod
kubectl get namespace
kubectl get node
kubectl config-info
kubectl config current-context

[all cmd work in namespace]
kubectl get namespace
kubectl get namespace.
kubectl get namespaces

kubectl get pod --namespace
kubectl get pod --namespace=default
kubectl get pod --namespace=kube-node-lease
kubectl get pod --namespace=kube-public
kubectl get pod --namespace=kube-system

kubectl run nginx --image=nginx
kubectl get pod/s
kubectl describe pod nginx
kubectl delete pod nginx

kubectl create deployment nginx-deployment --image=nginx
or
kubectl create deploy nginx-deploy --image=nginx


kubectl get deploy
kubectl get deployment
kubectl get deployments
kubectl get pod / pods


kubectl describe deployment nginx-deployment
or
kubectl describe deploy nginx-deploy [if you using deploy cmd]

kubectl scale deploy nginx-deploy --replicas=5
kubectl get pod -o wide

minikube ssh [access minikube]
==> then hit <== -----------> curl http://ip


Before hit this cmd check your services
kubectl get service/s
kubectl expose deploy nginx-deploy --port=8080 --target-port=80 [now you get service]

kubectl get svc [you will get cluster port] curl ip:port

kubectl describe service nginx-deploy
kubectl delete deployment nginx-deploy
kubectl delete service nginx-deploy

kubectl create deployment k8s-web --image=onlineaid/k8s-web [pull image and run container]
kubectl scale deploy k8s-web --replicas=3 [create replica as much you need but don't make 100 plus]
kubectl expose deploy k8s-web --port=5000 --target-pod=7000 [set port & you can set target port]

kubectl delete deployment k8s-web
kubectl delete service k8s-web
kubectl delete pod k8s-web [you don't need delete pod]

kubectl get svc
minikube ssh
curl 10.108.122.109:7000

kubectl expose deploy k8s-web --type=LoadBalancer --port=7000 [It will set target port you don't need to set target port]
kubectl scale deploy k8s-web --replicas=4
kubectl get svc
kubectl get deploy
kubectl get pod
kubectl get pod -o wide
kubectl describe deploy k8s-web

docker push onlineaid/k8s-web
docker build . -t onlineaid/k8s-web
docker build . -t onlineaid/k8s-web:2.0.0
docker push onlineaid/k8s-web:2.0.0


kubectl set image deploy k8s-web k8s-web=onlineaid/k8s-web
kubectl rollout status deploy k8s-web
kubectl get pod
minikube service k8s-web
kubectl set image deploy k8s-web k8s-web=onlineaid/k8s-web:2.0.0
kubectl rollout status deploy k8s-web
minikube service k8s-web
minikube dashboard

```


## Detailed Logs
If you need more detailed logs, you can use the --file option with the minikube logs command:

```

minikube logs --file=minikube-logs.txt

```


## This command is powerful and should be used with caution as it will remove a large number of resources.
```kubectl delete all --all```