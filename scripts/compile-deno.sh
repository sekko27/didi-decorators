#!/bin/bash -i

node_version=""
default_node_version="10.13.0"
ts_folder="/media/bazsi/5e1ae754-76a4-4a16-978b-d4a1977f486d/Backups/WORK/NODE/TypeScript"
deno_folder="/development/deno"
deno_version=""
ts_version=""

function blink {
    echo -e "\e[32m\e[5m$1\e[0m"
}

function title {
    echo -e "\e[1m$1\e[0m"
}

function subtitle {
    echo -e "⟶$(title $1)"
}

function calculating_node_version {
    title "Calculating node version"
    read -p "Please provide node version [$(blink $default_node_version)]: "
	if [[ "x${node_version}" == "x" ]]; then
	node_version="${default_node_version}"
    fi
    nvm use "${node_version}"
}

function upgrade_deno {
    deno upgrade
    deno_version=$(deno --version|egrep ^deno|awk '{printf("%s", $2);}')
    ts_version=$(deno --version|egrep ^typescript|awk '{printf("%s", $2);}')
    echo -e "Versions: deno[\e[31m\e[1m${deno_version}\e[0m], ts[\e[31m\e[1m${ts_version}\e[0m]"
}

function compile_ts {
    local tag=""
    local default_tag=""
    title "Compiling ts"
    subtitle "Checkout tags from upstream"
    pushd "${ts_folder}"
    git stash
    git clean -f
    git checkout upstream/master
    git pull upstream master --tags
    default_tag="v${ts_version}"
    echo -e "Available last tags:\n"
    for t in $(git tag|tail -n 10); do
	if [[ "${default_tag}" == "${t}" ]]; then
	    echo -e "	\e[32m\e[1m\e[5m${t}\e[0m"
	else
	    echo -e "	\e[31m${t}\e[0m"
	fi
    done
    read -p "+Choose tag [${default_tag}]: " tag
    if [[ "x${tag}" == "x" ]]; then
	tag="${default_tag}"
    fi
    git checkout "${tag}"
    
    subtitle "Applying pr from sekko: ${pr}"
    git checkout sekko/master
    git merge "${tag}"
    npm i
    npm run gulp runtests
    popd
}

function compile_deno {
    title "Compiling deno"
    pushd "${deno_folder}"
    git pull origin master --tags
    git clean -f
    git checkout "v${deno_version}"
    subtitle "Syncing compiled ts"
    pushd "${ts_folder}"
    rsync lib/typescript.js "${deno_folder}/cli/tsc/00_typescript.js"
    rsync --exclude=protocol.d.ts --exclude=tsserverlibrary.d.ts --exclude=typescriptServices.d.ts lib/*.d.ts "${deno_folder}/cli/dts/"
    popd
    cargo install deno
    popd
}

calculating_node_version
upgrade_deno
compile_ts
compile_deno
