# set the base href on html root
sed -i 's/<base href="\/">/<base href="\/'$SUBFOLDER'">/g' /usr/share/nginx/html/index.html

# set the base href on angular environment
export SUBFOLDER=${SUBFOLDER/\\/}
find /usr/share/nginx/html -maxdepth 1 -iname 'main-*.js' -type f -exec sh -c "envsubst '\${SUBFOLDER}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

# enable heart beat
export ENABLE_HEARTBEAT=${ENABLE_HEARTBEAT}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${ENABLE_HEARTBEAT}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

# path to heart beat microservice
export PATH_HEART_BEAT=${PATH_HEART_BEAT}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${PATH_HEART_BEAT}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

# UA ID Google Analytics
export GA_ID=${GA_ID}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${GA_ID}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

# enable helper
export ENABLE_HELPER=${ENABLE_HELPER}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${ENABLE_HELPER}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

# INFR_NAME name to separate tenants in different envs
export INFR_NAME=${INFR_NAME}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${INFR_NAME}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

export AZURE_CLIENT_ID=${AZURE_CLIENT_ID}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${AZURE_CLIENT_ID}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

export AZURE_TENANT_ID=${AZURE_TENANT_ID}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${AZURE_TENANT_ID}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

export AZURE_REDIRECT_URI=${AZURE_REDIRECT_URI}
find /usr/share/nginx/html/assets -maxdepth 1 -iname 'env.js' -type f -exec sh -c "envsubst '\${AZURE_REDIRECT_URI}' < {} > /tmp/tmp.js; mv /tmp/tmp.js {}" \;

#base image docker entrypoint
nginx -g 'daemon off;'
