require 'bundler/setup'
require 'rake/testtask'

namespace :bundler do
  task :setup do
    require 'rubygems'
    require 'bundler/setup'
  end
end

task :environment, [:env] => 'bundler:setup' do |cmd, args|
  ENV['RACK_ENV'] = args[:env] || 'development'
  require './app'
end

desc 'Minify client-side application assets'
task :build do
  sh %{cd public/js && node vendor/r.js -o app-build.js}
end

namespace :db do
  desc 'Run database migrations'
  task :migrate, :env do |cmd, args|
    env = args[:env] || 'development'
    Rake::Task[:environment].invoke(env)

    require 'sequel/extensions/migration'
    Sequel::Migrator.apply(App.database, File.join(File.dirname(__FILE__), 'migrations'))
  end

  desc 'Setup database triggers'
  task :setup, :env do |cmd, args|
    env = args[:env] || 'development'
    Rake::Task[:environment].invoke(env)

    App.database.pgt_created_at(:users, :created_at)
    App.database.pgt_updated_at(:users, :updated_at)

    App.database.pgt_created_at(:links, :created_at)
    App.database.pgt_updated_at(:links, :updated_at)

    App.database.pgt_created_at(:starred_links, :created_at)
  end

  desc 'Drop all tables'
  task :nuke, :env do |cmd, args|
    env = args[:env] || 'development'
    Rake::Task[:environment].invoke(env)

    App.database.tables.each do |table|
      App.database << "DROP TABLE #{table} CASCADE"
    end
  end

  desc 'Reset the database'
  task :reset, :env do |cmd, args|
    env = args[:env] || 'development'
    Rake::Task['db:nuke'].invoke(env)
    Rake::Task['db:migrate'].invoke(env)
    Rake::Task['db:setup'].invoke(env)
  end
end

namespace :seed do
  desc 'Seed the database'
  task :links, :count, :env do |cmd, args|
    env = args[:env] || 'development'
    count = args[:count].to_i || 25

    require './seed'
    count.times { Link.make; sleep 1 }
  end
end

Rake::TestTask.new do |t|
  t.pattern = 'test/*_test.rb'
end